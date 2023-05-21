# OspreyProduction

## Get Product Info

This request is capable of getting all products in the catalogue and can be customized to only provide the information

```
GET /api/service/product_info
```

## Query Params

[Click Here For Information on How to get the category id](#get-categories)

```
category: Product Category ID
subCat: Product Type (e.g acc_prod)
```

You can have multiiple product types in a comma seperated list.

There are two sections to each product:

- The Main "essential" information
- Unique Information about the product.

The Main Fields include:

```json
{
  "cost": {
    "amount": "534.24",
    "currency": "gbp"
  },
  "productType": {
    "modelName": "cam_prod",
    "id": "645678bb2aaebe2094e6c3c6"
  },
  "_id": "645678bc2aaebe2094e6c422",
  "product_code": "DSOS-1Z4I-I68",
  "product_name": "Marine Fixed Dome Stainless Steel Camera",
  "image": "URL",
  "technicalImages": [],
  "description": "This camera is a high-quality 720p resolution colour video camera with a 3x motorized zoom lens and auto-iris. It will produce high-definition video in low light conditions. The camera includes integrated IR LEDs for operation at 0 lux.  The camera supports multiple streams and resolutions in MJPEG or H.264 codec. The zoom lens is remotely adjustable from 2.7 to 12.0 mm, to provide a horizontal field-of-view of up to 100 degrees.  The camera is housed in a stainless-steel dome rated IP68. It comes ready for mounting and requires only a powered ethernet network connection. It is designed for use in onshore, offshore, marine and heavy industrial environments including passenger ships & commercial vessels.  ",
  "category": "marine",
  "addit_category": "",
  "features": ["4x motorized zoom lens", "\tDay/Night switching for almost any lighting condition", "\tH264,H265", "\tPoE", "\tIP68 Stainless steel enclosure for harsh environments"],
  "feature_deprec": "",
  "__v": 0
}
```

From the follwing parameters can be used to limit this information.

**NOTE** In Include and Exclude cannot be used in the same time. An error will be displayed if you attempt this.

```
include: product_name,cost
```

If we run the request with the above paremter it will display the following:

```json
{
  "cost": {
    "amount": "534.24",
    "currency": "gbp"
  },
  "_id": "645678bc2aaebe2094e6c422",
  "product_code": "DSOS-1Z4I-I68",
  "product_name": "Marine Fixed Dome Stainless Steel Camera"
}
```

as we can see both cost and product name has been displayed. Also \_id and product_code is also showed. These fields will always be displayed and cannot be removed.

```
exclude: product_name,cost
```

Here we are saying to exclude product name and cost from the results. Here we can see the result:

```json
{
  "productType": {
    "modelName": "cam_prod",
    "id": "645678bb2aaebe2094e6c3c6"
  },
  "_id": "645678bc2aaebe2094e6c422",
  "product_code": "DSOS-1Z4I-I68",
  "image": "URL",
  "technicalImages": [],
  "description": "This camera is a high-quality 720p resolution colour video camera with a 3x motorized zoom lens and auto-iris. It will produce high-definition video in low light conditions. The camera includes integrated IR LEDs for operation at 0 lux.  The camera supports multiple streams and resolutions in MJPEG or H.264 codec. The zoom lens is remotely adjustable from 2.7 to 12.0 mm, to provide a horizontal field-of-view of up to 100 degrees.  The camera is housed in a stainless-steel dome rated IP68. It comes ready for mounting and requires only a powered ethernet network connection. It is designed for use in onshore, offshore, marine and heavy industrial environments including passenger ships & commercial vessels.  ",
  "category": "marine",
  "addit_category": "",
  "features": ["4x motorized zoom lens", "\tDay/Night switching for almost any lighting condition", "\tH264,H265", "\tPoE", "\tIP68 Stainless steel enclosure for harsh environments"],
  "feature_deprec": "",
  "__v": 0
}
```

Here we can see everything but product name and cost.

## Additional Field Population

Each product has unique fields that can be accessed with the following.
**Note** To have all fields shown put all in this field

```
populate_include: av,power
```

Here the following is added

```json
{
  "av": {
    "camera": "SONY 1/2.7â€³CMOS",
    "resolution": ""
  },
  "power": {
    "ethernet": "Ethernet RJ-45(10/100/1000Base-T)"
  },
  "_id": "645678bb2aaebe2094e6c3c6"
}
```

Like before the same can be done for excluding.

```
populate_exclude: av,power
```

Output:

```json
{
  "pan_tilt": {
    "pan-range": "na",
    "pan-speed": "na",
    "tilt-range": "na",
    "tilt-speed": "na",
    "pre-sets": "na",
    "pre-set_tours": "na",
    "motion_tracking": "na"
  },
  "certifications": {
    "impact_protection": "",
    "salt_fog_resistance": "",
    "corrosion_testing": "",
    "vibration_testing": "",
    "ingress_protection": "IP66",
    "marine": "",
    "hazardous_area": ""
  },
  "physical": {
    "material": "316L stainless Â steel",
    "operating_temp": "-40â„ƒï½ž60â„ƒ",
    "relative_humidity": "â‰¤Â 95%ï¼ˆ+25Â°Cï¼‰",
    "atmospheric_pressure": "80kpaï½ž106 k",
    "weight": "",
    "cable_entry": "1pcs M20*1.5 output(original G1/2)",
    "mounting_options": "Wall hanging, fixed bracket , pedesta"
  }
}
```



## Search For Products
This route allows for the searching of products across the whole catlaogue using any key to search for

```
GET http://localhost:3030/api/service/search
```

```
Query Params
type: Product Type (Not Required)
searchFor: key to search for. (Example product_name) Defaults to product_name (Not Required)
searchQuery: Query to seach for. (Not Required)

Pagination
page: page number (1)
limit: items per page (10)
```

## Example Payload

Here is an example request searching for the term marine

```
GET http://localhost:3030/api/service/search?page=1&searchQuery=marine
```

```json
{
    "products": [
        {
            "_id": "64563432b8dec85f18ffa536",
            "product_code": "OSWASH",
            "product_name": "Washer nozzel for marine cameras",
            "product_link": "/api/product/product_info?documentId=64563432b8dec85f18ffa536"
        },
        {
            "_id": "64563432b8dec85f18ffa546",
            "product_code": "OSTANKAABB",
            "product_name": "Washer tank for marine cameras",
            "product_link": "/api/product/product_info?documentId=64563432b8dec85f18ffa546"
        },
        {
            "_id": "645657ae09716fa207a0ffa3",
            "product_code": "BSOA0000067",
            "product_name": "Marine camera housing",
            "product_link": "/api/product/product_info?documentId=645657ae09716fa207a0ffa3"
        }
    ],
    "totalPages": 8,
    "currentPage": 1
}
```

If we want additional information we can add the paramerter extra.

```
GET http://localhost:3030/api/service/search?page=1&limit=3&searchQuery=marine&extra=true
```

```json
{
    "products": [
        {
            "_id": "64563432b8dec85f18ffa536",
            "product_code": "OSWASH",
            "product_name": "Washer nozzel for marine cameras",
            "image": "",
            "description": "The Washer bracket/nozzle assembly provides an effective wash facility for marine cameras clamping neatly via camera mounting bracket bolts.\nThe bracket arm provides holes for cable-tying a washer pipe (not included).  To operate, simply set a preset position in the camera as a\ndedicated wash position, then enable the wash function for the camera. Washer tubing is 4mm inside diameter; 6mm outside diameter\nYou will require a washer bottle (OSTANKAABB) and wash relay control.",
            "product_link": "/api/product/product_info?documentId=64563432b8dec85f18ffa536"
        },
        {
            "_id": "64563432b8dec85f18ffa546",
            "product_code": "OSTANKAABB",
            "product_name": "Washer tank for marine cameras",
            "image": "",
            "description": "The WPN400 washer series offers a wide range of water reservoir capacities with different pumping height capabilities. The tank is protected by a frame in AISI316 stainless steel.  The washer units are provided with an IP66 rated watertight plastic junction box that contains the power supply for the self-priming submersible pump located inside the tank. The optional float switch prevents the washer unit from running dry and causing damage to the pump. It is wired into the washer power supply unit so when the water level drops to a specific level the power to the pump is cut. The alarm output can be connected to the camera to indicate when the bottle needs refilling.\n",
            "product_link": "/api/product/product_info?documentId=64563432b8dec85f18ffa546"
        },
        {
            "_id": "645657ae09716fa207a0ffa3",
            "product_code": "BSOA0000067",
            "product_name": "Marine camera housing",
            "image": "",
            "description": "Fully cable managed Camera Housing, including wall bracket and 12V DC/24V AC heater. Ruggedised marine finish. The BSA0067 is a tough, fixed camera\nhousing which seals against dirt, moisture and dust ingress. It allows a wide range of fixed cameras and lenses to be used in tough, outdoor environments. It is IP67 weather-proof rated and IK10\nshock and vandal-resistant.  It can be pendant or pedestal mounted to ceilings, walls\nand soffits.",
            "product_link": "/api/product/product_info?documentId=645657ae09716fa207a0ffa3"
        }
    ],
    "totalPages": 8,
    "currentPage": 1
}
```

## Get Categories

Basic Route to get category id's

```
GET http://localhost:3030/api/service/categories
```

Example Response

```json
{
    "cats": [
        {
            "_id": "CAT_ID",
            "name": "CCTV",
            "image": "IMAGE_URL"
        }
    ]
}
```
## Get Model Structure

This route is for getting the structure of products and what "block" it is associated with.

```
GET http://localhost:3030/api/service/get_model_structure
```

### Query Params
```
selectedModel: product to get model of
category: id of category
showTypes: true / false. Shows additonal info such as key type
showUnsed: true / false. Shows items that are unsused in the model
