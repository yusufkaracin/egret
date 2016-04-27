# EGRET 

## Build & development

* Install `compass` for Ubuntu

```
sudo apt-get update

sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties

sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev

# if you get error, follow instructions in terminal message
# gpg --keyserver hkp://keys.gnupg.net --recv-keys <key>
# sudo apt-get update

curl -L https://get.rvm.io | bash -s stablecurl -L https://get.rvm.io | bash -s stable

source ~/.rvm/scripts/rvm
echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc

rvm install 2.1.2
rvm use 2.1.2 --default
ruby -v

gem install compass
```

* `npm install`
* `bower install`
* Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


### Thanks

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 1.0.0.
