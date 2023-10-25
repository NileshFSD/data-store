from flask import Flask, request
import whatismyip
import socket

app = Flask(__name__)

@app.route('/')
def get_client_ip():
    # Try to get the client's IP address from the X-Forwarded-For header
    client_ip = request.headers.get('X-Real-IP')
    ip = whatismyip.whatismyip()
    print(f"I am a string yay {ip}")
    # ip = requests.get('https://checkip.amazonaws.com').text.strip()
    #  print("ip:", ip)
    # hostname = socket.gethostname()
    # ip_address = socket.gethostbyname(hostname)
    # print(f"Hostname: {hostname}, ip:{ip_address}  ")
    #  print(f"IP Address: {ip}")

## getting the hostname by socket.gethostname() method

## getting the IP address using socket.gethostbyname() method
# ip_address = socket.gethostbyname(hostname)
## printing the hostname and ip_address

# print(f"IP Address: {ip_address}")

    
    # If X-Forwarded-For header is not present, get the IP address from remote_addr
    if client_ip is None:
        client_ip = ip
    
    return f"Client's IP address: {client_ip}"

if __name__ == '__main__':
    app.run(debug=True)




    # To run the App:-  python app.py
