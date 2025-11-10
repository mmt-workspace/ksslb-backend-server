# ksslb-backend-server
The backend repo is only allow for authorize user


curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && 

sudo dpkg -i cloudflared.deb && 

sudo cloudflared service install eyJhIjoiZTYxOWVjYjNjYjNkNGY3Y2ExODRmMGEwYWNlMTUyYmIiLCJ0IjoiODk3ZWUzMzctOTQ0Ni00NDUyLWIxOWMtZDJkZmEyNWQ2MzllIiwicyI6IlpHVmxOVGN4T1RRdE9ESXlPUzAwT1RZMExUZ3lNbVV0Wmpsa1pXSmtaVGhrTmpVdyJ9




# HTTP server for api.institute.mmt-ng.com
server {
    server_name institute.mmt-ng.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }



sudo cloudflared service install eyJhIjoiZTYxOWVjYjNjYjNkNGY3Y2ExODRmMGEwYWNlMTUyYmIiLCJ0IjoiODk3ZWUzMzctOTQ0Ni00NDUyLWIxOWMtZDJkZmEyNWQ2MzllIiwicyI6IlpEUmlOV1l3WlRVdE5UTTNNUzAwWWpNeExXRXlZMk10WTJOaE9ESXhNelJoTWpVMSJ9