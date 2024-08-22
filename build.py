import hashlib
import os
import json
import argparse
from typing import TypedDict, Literal
from datetime import datetime

assert os.path.isfile("src/faraday.json")

parser = argparse.ArgumentParser(description="Command line tool to assist in building Faraday's frontend")
parser.add_argument("--version", "-v", type=str, help="Frontend's version number")
parser.add_argument("--author", "-a", type=str, help="Set author for Faraday", required=False, default="Emilio Mendoza")
parser.add_argument("--release_type", "-r", type=str, help="Set release to be alpha, beta, or release", required=False, default="Alpha")


args = parser.parse_args()


def checksum() -> str:
    h = hashlib.sha256()
    # O(N^2)??
    for root, dirs, files in os.walk("src"):
        for file in files:
            with open(os.path.join(root, file), "rb") as f:
                while True:
                    data = f.read(4096)
                    if len(data) == 0:
                        break
                    else:
                        h.update(data)
    return h.hexdigest()

class FaradayJson(TypedDict):
    name: Literal["Faraday Password Manager"]
    version: str
    release: Literal["Alpha"] | Literal["Beta"] | Literal["Release"]
    built: str
    license: str
    license_link: str
    author: str
    source_code: str


def updateJson():
    faraday_path = os.path.join(os.getcwd(), "src", "faraday.json")
    with open(faraday_path, "r") as f:
        data: FaradayJson = json.load(f)

    data["version"] = args.version
    data["author"] = args.author
    data["release"] = args.release_type
    data["built"] = datetime.now().strftime("%a %d/%m/%y %I:%M:%S%p")

    with open(faraday_path, "w") as f:
        json.dump(data, f)


def main():
    print("Updating JSON")
    updateJson()
    print(f"Checksum: {checksum()}")
    print("Building")
    built = os.system("npm run build")
    print("Success!" if built == 0 else "Build Failed :(")

if __name__ == "__main__":
    main()
    
