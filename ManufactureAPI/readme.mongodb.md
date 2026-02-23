<!--
1) connection:
mongodb+srv://healthcare_db:abc123456789@healthcare.on4llao.mongodb.net/?retryWrites=true&w=majority

app: FastAPI

app.mongodb_client = MongoClient("mongodb+srv://healthcare_db:abc123456789@healthcare.on4llao.mongodb.net/?retryWrites=true&w=majority")

app.database = app.mongodb_client[database_name]

=> Connected to the MongoDB database

app.mongodb_client.close()

Close to the MongoDB database!

2) Create table on Mongodb:
app.database[table_name].insert_one(dict(item))
=> item: define structure on table
=> example: 
item is Company:
    code:str
    name:str
    description:str
    country:str
    address:str
    phone:str
    email:str
3) Update:
app.database[table_name].update_one({"_id": ObjectId(id)},{
        "$set": dict(item)})    
4) Delete:
app.database[table_name].delete_one({"_id": ObjectId(id)})

5) create a view:
    app.database[table_name_1].aggregate([
        { "$lookup": {
            "from": "table_name_2",
            "let": { "id": "$_id" },
            "pipeline": [
            { "$match": { "$expr": { "$eq": [{ "$toString": "$$id" }, "$column_name"] }}}
            ],
            "as": "name"
        }}
        ])
    => get all information table_name_1 and table_name_2

Example: get view: J_Product_Item,  M_Product and M_Item
 app.database['J_Product_Item'].aggregate([
        { "$lookup": {
            "from": "M_Product",
            "let": { "product_id": "$product_id" },
            "pipeline": [
            { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$product_id"] }}}
            ],
            "as": "product_details"
        }},
        {
            '$unwind': '$product_details'
        },
        { 
            "$lookup": {
                "from": "M_Item",
                "let": { "item_id": "$item_id" },
                "pipeline": [
                    { "$match": { "$expr": { "$eq": [{ "$toString": "$_id" }, "$$item_id"] }}}
                ],
                "as": "item_details"
            }
        },
        {
            '$unwind': '$item_details'
        },
        {
            "$project":{
                "_id": { '$toString': "$_id" },
                "product_id": { '$toString': "$product_details._id" },
                "product_code": "$product_details.code",
                "product_name": "$product_details.name",
                "product_standard_price": "$product_details.standard_price",
                "product_unit_of_measure": "$product_details.unit_of_measure",
                "product_company_id": "$product_details.company_id",
                "product_department_id": "$product_details.department_id",
                "product_category_id": "$product_details.category_id",
                "item_details": [
                    {
                        "item_id": { '$toString': "$item_details._id" },
                        "code": "$item_details.code",
                        "name": "$item_details.name",
                        "quantity": "$item_details.quantity",
                        "start_plan_date": "$item_details.start_plan_date",
                        "end_plan_date": "$item_details.end_plan_date",
                        "production_date": "$item_details.production_date",
                        "created_date": "$item_details.created_date",
                        "company_id": "$item_details.company_id",
                        "department_id": "$item_details.department_id",
                        "product_id": "$item_details.product_id",
                        "storage_id": "$item_details.storage_id"
                    }
                ]
            }
        }
        ])       
-->