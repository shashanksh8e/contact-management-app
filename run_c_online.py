import requests
import json

# Read the C file
with open('Untitled-1.c', 'r') as f:
    c_code = f.read()

# Prepare the request for an online C compiler API
url = "https://api.jdoodle.com/v1/execute"
data = {
    "clientId": "your_client_id",  # You'd need to register for free
    "clientSecret": "your_client_secret",
    "script": c_code,
    "language": "c",
    "versionIndex": "4",
    "stdin": "hello world"  # Sample input
}

print("C Code to be executed:")
print("=" * 50)
print(c_code)
print("=" * 50)
print("\nThis would run with input: 'hello world'")
print("Expected output:")
print("Length of first string: 5")
print("Length of second string: 5") 
print("Strings are not equal.")
print("Concatenated string: helloworld")