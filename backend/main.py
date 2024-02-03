import http.server

PORT = 8001


class GetHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)

        self.send_header("Content-type", "text/html")
        self.end_headers()

        msg = "Handled get request"
        self.wfile.write(bytes(msg, "utf8"))
        return

    def do_POST(self):
        self.send_response(200)

        self.send_header("Content-type", "text/html")
        self.end_headers()

        msg = "Handled POST request"
        self.wfile.write(bytes(msg, "utf8"))
        return


if __name__ == '__main__':
    with http.server.HTTPServer(('', PORT), GetHandler) as httpd:
        print(f"Server started on port {PORT}")
        httpd.serve_forever()
