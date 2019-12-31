# Buckit API
Backend for Buckit LA
https://testflight.apple.com/join/1fH1LPgn

## How to install

1. Clone repo `git clone https://github.com/parthingle/bkit-api.git`
2. Install packages and run `yarn && yarn start`


## API Spec:

1. Facebook Authentication 
  
`POST /api/auth/facebook`

Logs you in if you have an account, creates an account and then logs you in if you don't
Account creation involves creation of a refresh token

### Required params: 
* `access_token`: `Facebook access token`

### Response: 
`200`: 
```
{
  "jwtoken": Short lived irrevokable token to securely communicate with server,
  "rtoken": Long lived revokable token to regenerated jwtoken
}
```

`401`: Invalid Facebook access token

`500`: Server Error

------------------------------------------------------------------------------------
2. Refresh JWT 
  
`POST /api/auth/refresh`

Refreshes your jwtoken with a valid refresh token


### Required params:
* `rtoken`: `Server refresh token`

### Response:
`200`: 
```
{
  "jwtoken": Short lived irrevokable token to securely communicate with server,
  "rtoken": Long lived revokable token to regenerated jwtoken
}
```

`401`: Invalid Refresh access token

`500`: Server Error

------------------------------------------------------------------------------------

3. Get my profile

`GET /api/user/my`

Gives you your profile data. Ids you with the jwtoken.

### Required params:
* n/a 

HEADERS:
* `"x-auth-token"`: `jwtoken`

### Response:
`200`: 
```
{
  user: {
          profileId: uuid
          firstName: str
          lastName: str
          email: str
          profilePic: str
          bio: str
          dateCreated: number
          signupComplete: bool
          lastLogin: number
          myBucketedItems: array[uuid]
          friends: array[uuid]
          rtoken: str
   }
}
```

`401`: Invalid jwtoken

`500`: Server Error

------------------------------------------------------------------------------------

4. Get home page

Gives you all the data needed to populate the home page

`GET /api/user/home`

Gives you your profile data. Ids you with the jwtoken.

### Required params:
* n/a 

HEADERS:
* `"x-auth-token`: `jwtoken`

### Response:
`200`: 
```

{
  completionPercentage: number,
  items: array [
    {
      album: array [str],
      category: str,
      content: {
        description: str,
        thingsToDo: array [str]
      },
      coordinates: {
        _latitude: number,
        _longitude: number
      },
      creator: str,
      dateCreated: number,
      itemId: uuid,
      tags: [str],
      title: str,
      upvotes: number,
      usersWhoBucketed: array[uuid],
      done: bool
    },...
  ]
}
```

`401`: Invalid jwtoken

`500`: Server Error

------------------------------------------------------------------------------------

5. Buck Item


`POST /api/item/buck?id=&timestamp=`

"Buck" Item


### Required params:
* n/a 

HEADERS:
* `"x-auth-token"`: `jwtoken`

### Response:
`200`: 

```{ message: "item bucked!" }```


`401`: Invalid jwtoken

`500`: Server Error

------------------------------------------------------------------------------------

5.Unbuck Item


`POST /api/item/unbuck?id=`

"Unbuck" Item


### Required params:
* n/a 

HEADERS:
* `"x-auth-token"`: `jwtoken`

### Response:
`200`: 

```{ message: "item unbucked!" }```


`401`: Invalid jwtoken

`500`: Server Error
