class SimpleCorsMiddleware:
    """Allow the local React dev server to talk to the API."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        from django.http import HttpResponse

        if request.method == 'OPTIONS':
            response = HttpResponse(status=200)
            response['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            response['Access-Control-Allow-Headers'] = 'Content-Type, X-User-Id'
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
            response['Access-Control-Allow-Credentials'] = 'true'
            return response

        response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        response['Access-Control-Allow-Headers'] = 'Content-Type, X-User-Id'
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        response['Access-Control-Allow-Credentials'] = 'true'
        return response
