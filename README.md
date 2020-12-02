# For first run (Chay lan dau)
npm install
npm start
# Init project

# 1. For first run :  
npm init

# 2. Update module : 
git submodule update --remote


API docment
https://documenter.getpostman.com/view/11282339/T1LMk7xD
===============
RUN APPLICAITON

1. init submodule

# chạy lân đầu: git submodule update --init

# chạy cập nhật code mới: git submodule update --remote

2. cài đặt thư viện
   npm install

3. run docker
   docker-compose up -d

4. run application
   npm run dev

#### for first run

git submodule update --init
git submodule update --remote
npm install
docker-compose up -d
npm run dev

##### for second run

git pull
git submodule update --remote
npm install
docker-compose up -d
npm run dev

# ========== INIT BACKEND PROJECT ============ #

# 1. Install Moleculer CLI
   npm install -g moleculer-cli

2. Init project:
   moleculer init project-typescript flynotes-backend

3. Install tsconfig-path
   npm install tsconfig-paths --save

4. Conf tsconfig path in tsconfig
   "baseUrl": "./",
   "paths": {
   "@Core/_": ["flynotes-base/_"],
   "@Model/_": ["flynotes-base/model/_"],
   "@Interface/_": ["flynotes-base/interface/_"],
   "@Services/_": ["server/service/_"],
   "@ServiceType/_": ["server/service-type/_"],
   "@Applications/_": ["server/application/_"]
   }

# 5. Init git submodule

git submodule add git@github.com:hieuflynotes/base-stock-afi.git
git submodule add git@github.com:hieuflynotes/base-ale.git

# 5.1. delete submodule

git rm --cached submodule_path
git rm .gitmodules
rm -rf submodule_path

# 6. Mongo migrate

npm install -g migrate-mongo
migrate-mongo init

# ================= SETUP SERVER ============ #
# 1. Gen SSH key

   - ssh-keygen -t rsa -b 4096 -C "hieu@flynotes.co.uk"

# 2. Install npm

   - sudo apt install npm

# 3. Docker

   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

# 4. Docker compose
   - sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
   - sudo chmod +x /usr/local/bin/docker-compose
   - sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
   - docker-compose --version

# 5. RUN APPLICATION
   git clone git@github.com:hieuflynotes/stock-afi-backend.git
   git submodule update --init
   git submodule update --remote
   sudo npm run dc:up

# 6. config nginx
   1. Install cerbot:
      sudo add-apt-repository ppa:certbot/certbot
      sudo apt-get update
      sudo apt-get install python-certbot-nginx

   2. Setup nginx
      sudo nano /etc/nginx/sites-available/default
      # Replace domain name: server_name example.com www.example.com;
      sudo nginx -t
      sudo systemctl reload nginx

   3. Allow firewall
      sudo ufw allow 'Nginx Full'
      sudo ufw delete allow 'Nginx HTTP'
      sudo ufw status

   4. Get ssl
      sudo certbot --nginx -d example.com -d www.example.com
      choose 2 to update nginx
      sudo nano /etc/nginx/sites-available/default
         change: proxy_pass    http://127.0.0.1:4001/;
      sudo nginx -t
      sudo systemctl reload nginx

# =========== UPDATE CODE =============
   ssh -i "../keys/stock-lending-dev.pem" ubuntu@ec2-13-229-88-203.ap-southeast-1.compute.amazonaws.com
   cd stock-afi-backend
   git checkout -f master
   git pull -f 
   git submodule update --remote
   sudo npm run dc:up-development
   
   git pull -f 
   sudo npm run dc:up-development
   

# =========== SSH =============

1. Server Lending:
   .develop: ssh -i "../keys/stock-lending-dev.pem" ubuntu@ec2-13-229-88-203.ap-southeast-1.compute.amazonaws.com
