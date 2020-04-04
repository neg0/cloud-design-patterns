# Health Endpoint Monitoring Pattern
Implement functional checks in an application that external tools can access through exposed 
endpoints at regular intervals. This can help to verify that applications and services are 
performing correctly.


### Create SSL Certificates
we use `openssl` package to create the SSL certificates for local use (Not Production)

    ~$: openssl genrsa -out key.pem
    ~$: openssl req -new -key key.pem -out csr.pem
    ~$: openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
    ~$: rm csr.pem
