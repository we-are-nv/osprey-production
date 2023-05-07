# OspreyProduction

## Get Product Info

This request is capable of getting all products in the catalogue and can be customized to only provide the information

```
GET /api/service/product_info
```

## Query Params

```
type: Product Type (e.g camera, accessory, disk_nvr)
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
