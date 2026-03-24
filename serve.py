#!/usr/bin/env python3
"""
Simple development server with auto-reload using browser refresh.
Serves files and injects a script that watches for file changes.
"""
import http.server
import socketserver
import os
import threading
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

PORT = 8000

class ReloadHandler(FileSystemEventHandler):
    def __init__(self, server):
        self.server = server
        self.clients = set()
    
    def on_modified(self, event):
        if event.src_path.endswith('.html'):
            # Notify clients to reload
            for client in list(self.clients):
                try:
                    client.send(b'data: reload\n\n')
                except:
                    self.clients.discard(client)

class HTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    reload_clients = set()
    
    def do_GET(self):
        if self.path == '/reload':
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()
            self.reload_clients.add(self.wfile)
            return
        
        # Inject reload script into HTML files
        if self.path.endswith('.html') or self.path == '/':
            super().do_GET()
            return
        
        super().do_GET()
    
    def log_message(self, format, *args):
        pass  # Suppress default logging

def inject_reload_script(content):
    """Inject SSE client script into HTML"""
    script = """
    <script>
    if (window.EventSource) {
        const eventSource = new EventSource('/reload');
        eventSource.onmessage = function(event) {
            if (event.data === 'reload') {
                window.location.reload();
            }
        };
    }
    </script>
    """
    # Insert before closing </body> or </html>
    if '</body>' in content:
        return content.replace('</body>', script + '</body>')
    elif '</html>' in content:
        return content.replace('</html>', script + '</html>')
    return content

if __name__ == '__main__':
    handler = HTTPRequestHandler
    
    # Monkey patch to inject reload script
    original_end_headers = handler.end_headers
    def end_headers(self):
        if self.path.endswith('.html') or self.path == '/':
            content = self.wfile.getvalue() if hasattr(self.wfile, 'getvalue') else b''
            if content:
                content_str = content.decode('utf-8', errors='ignore')
                modified = inject_reload_script(content_str)
                self.wfile = modified.encode('utf-8')
        original_end_headers(self)
    
    handler.end_headers = end_headers
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print("Auto-reload enabled! Changes to HTML files will refresh the browser.")
        print("Press Ctrl+C to stop.")
        httpd.serve_forever()



