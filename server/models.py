from  server import db
from server import User


db.create_all()
bankUser = User(username="sam" , email="kinyahQ" , password="1234")
db.session.add(bankUser)
db.session.commit()
print("successfully created a db")