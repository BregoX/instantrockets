# Instant Rockets

## Setup and run

### Build

1. Install nodejs [here](https://nodejs.org/en/)
1. Install gulp. Terminal: _npm install -g gulp-cli_
1. Install typescript. Terminal: _npm install -g typescript_
1. Install texture packer [here](https://www.codeandweb.com/texturepacker)
1. Restore node modules. Root project folder. Terminal: _npm install_
1. Build the project. Terminal: _gulp_

### Run

1. Install http-server. Terminal: _npm install -g http-server_
1. Go to. Dist/game sub-folder of the root folder.
1. Run. Terminal: _openssl genrsa 2048 > key.pem_
1. Run. Terminal: _openssl req -x509 -days 1000 -new -key key.pem -out cert.pem_
1. Trust the certificate. Double click cert.pem file. In mac keychain double click the certificate and select trust option. Select always trust for all options inside.
1. Run. Terminal: _http-server --ssl -c-1_
1. Open the project. Open `https://www.facebook.com/embed/instantgames/349811882120473/player?game_url=https://localhost:8080` in your browser.