from enum import unique
from flask import Flask,request,json
from flask_restful import Api ,Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func


import hashlib, uuid

# from requests import 
from flask_cors import CORS

import os

from pytz import timezone 




# from getpass import getpass
# from mysql.connector import connect, Error

# try:
#     with connect(
#         host="localhost",
#         user=input("Enter username: "),
#         password=getpass("Enter password: "),
#     ) as connection:
#         create_db_query = "CREATE DATABASE online_movie_rating"
#         with connection.cursor() as cursor:
#             cursor.execute(create_db_query)
# except Error as e:
#     print(e)



app = Flask(__name__)
# app.config["SECRET_KEY"] = '571ebf8e13ca209536c29be68d435c00'
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///registration.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

api = Api(app)
# CORS(app) 

class User(db.Model):
    id = db.Column(db.Integer ,primary_key=True , autoincrement =True)
    username = db.Column(db.String(20) ,unique=True,nullable=False)
    email = db.Column(db.String(30) ,unique=True, nullable=False)
    password = db.Column(db.String(20) ,unique=True, nullable =False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())





   # def __init__(self ,username,email ,password ):
    #     self.username = username
    #     self.email = email
    #     self.password = password
    def __repl__(self):
        return '<User %r>' % self.username


class Roles(db.Model):
    id = db.Column(db.Integer ,primary_key=True , autoincrement =True)
    name = db.Column(db.String(20) ,unique=True,nullable=False)
    description = db.Column(db.String(30) ,unique=True, nullable=False)
    is_active = db.Column(db.Boolean() ,unique=True, nullable =False)
    created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    modified = db.Column(db.DateTime(timezone=True), server_default=func.now())



class User_Roles(db.Model):
    id = db.Column(db.Integer ,primary_key=True , autoincrement =True)
    user_id = db.Column(db.String(20) ,unique=True,nullable=False)
    roles_id = db.Column(db.String(30) ,unique=True, nullable=False)
    is_active = db.Column(db.Boolean() ,unique=True, nullable =False)
    created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    modified = db.Column(db.DateTime(timezone=True), server_default=func.now())    




class Accounts(db.Model):
    id = db.Column(db.Integer ,primary_key=True , autoincrement =True)
    account_numder = db.Column(db.String(12) ,unique=True,nullable=False)
    user_id = db.Column(db.String(20) ,unique=True, nullable=False)
    balance = db.Column(db.Integer ) 
    account_type = db.Column(db.String(10) ,server_default ="world", nullable =False)
    created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    modified = db.Column(db.DateTime(timezone=True), server_default=func.now())




class Transactions(db.Model):
    id = db.Column(db.Integer ,primary_key=True , autoincrement =True)
    account_numder = db.Column(db.String(12) ,unique=True,nullable=False)
    user_id = db.Column(db.String(20) ,unique=True, nullable=False)
   
    account_type = db.Column(db.String(10) ,unique=True, nullable =False)
    created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    modified = db.Column(db.DateTime(timezone=True), server_default=func.now())    
session_data ={}
@app.route("/home" , methods = ['POST'])
def create_session():


    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):

        username = str(request.json["name"]).lower()
        # email = str(request.json['email'])

    users = User.query.filter_by(username=username).all()
    for user in users:
        print(user.password)

        session_data ={"username" :username , "email":user.email}
    # print(session_data)
    return session_data



@app.route("/login" , methods = ['POST'])
def login():

    response = {}
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):

        username = str(request.json["username"]).lower()
        email = str(request.json['email']).lower()


        password = str(request.json['password']).lower()

        # salt = uuid.uuid4().hex
        hashed_password = hashlib.md5((password ).encode('utf-8')).hexdigest()
        print(hashed_password)

        if login_user(username=username , email=email ,password=hashed_password) == True:
            response = {"success" : True}


        else:
            response ={"succces" : False}

    return response    




@app.route("/reg" , methods=['POST'])
def register():
   
    

# class User(db.Model):
#    id = db.Column(db.Integer, primary_key =True)
#    username = db.Column(db.String(100), nullable = False)
#    user_email = db.Column(db.String(100), nullable= False)
#    user_password = db.Column(db.String(150), nullable = False)

    
    print("run")

    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        
        print("=====================true============================")
        # data = json.loads(request.data)
        username = str(request.json["username"])
        email = str(request.json['email'])


        password = str(request.json['password'])
        # password = password.encode('utf-8')

        # salt = uuid.uuid4().hex
        hashed_password = hashlib.md5((password ).encode('utf-8')).hexdigest()
      
        data_json = request.data
        user = json.loads(data_json)

        print(user)
        unique_user = False
        response = {}
        print(user_lookup(username , email , hashed_password))
        if user_lookup(username , email , hashed_password) == False:

            unique_user= True
            response = {"success":True}

            db.create_all()
            bankUser = User(username=username , email=email , password=hashed_password)
            db.session.add(bankUser)
            db.session.commit()
            print("successfully created a db")

        else:
            print("password or email is taken")
            response = {"success" : False}    

            # user = User(username =username , email=email  ,password=hashed_password)
            


    else:
        print("===============false=========================")    


        # print(title)
        # return data

    # #  str(request.json['user'])

    # print( request.json['user'])

    # # print(request.json.get("user"))

    # if unique_user ==  False:  
    #     return {"success":False}

    # else:
    #     return {"success": True} 
    # 
    return response   

def  user_lookup(username , email , password):
    users = User.query.all()
    for user in users:
        if(username == user.username or password == user.password ):
            return True


        # else:

    return False

def  login_user(username , email , password):
    users = User.query.filter_by(username=username).all()
    for user in users:
        print(user.password)

        session_data ={"username" :username , "email":user.email}
        print("sessiondata =" , session_data)
        if( password == user.password ):
            return True


        # else:
        






       
        # print(user.username)
        # print(user.password)
    # Student.query.filter_by(firstname='Sammy').all()
    


    #     # return { "predictions" : predictions } 
# print(preds)        # api.add_resource(Login , "/register")
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5550))
    app.run(host='0.0.0.0', port=port , debug=True)

# import os
# from flask import Flask, render_template, request, url_for, redirect
# from flask_sqlalchemy import SQLAlchemy

# from sqlalchemy.sql import func


# basedir = os.path.abspath(os.path.dirname(__file__))

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] =\
#         'sqlite:///' + os.path.join(basedir, 'database.db')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)


# class Student(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     firstname = db.Column(db.String(100), nullable=False)
#     lastname = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(80), unique=True, nullable=False)
#     age = db.Column(db.Integer)
#     created_at = db.Column(db.DateTime(timezone=True),
#                            server_default=func.now())
#     bio = db.Column(db.Text)

#     def __repr__(self):
#         return f'<Student {self.firstname}>'