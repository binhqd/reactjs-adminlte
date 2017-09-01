## Run server
```sh
sudo docker run -d --name=biz-admin --restart=always -p 3001:80 -v /var/www/sangg/admin/build:/usr/share/nginx/html nginx:1.13
```
