This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[`live Demo:`](https://property-adib.vercel.app/)

## How it works

1. First by default home page is loaded which includes property cards view which is visible to all.
2. routes are protected except for home, first if there is no admin and second if admin role is different.

## 1. create admin user

1. includes username, password and role. (role=["Admin", "Customer"])
2. validation: empty fields and duplicate admin user.
3. enter all fields and hit submit. after successful admin creation you will redirected to login page.

## 2. login admin user

1. includes username, password.
2. validation: empty fields, admin user does not exist and invalid credentials.
3. enter all fields and hit submit. after successful login you will redirected to home page.

## 3. Admin and customer role authorization.

1. after admin role login some access is only given to Admin

   1. only admin create, update and delete property cards.
   2. only admin can view leads, link property to leads

2. after customer role login
   1. customer can only view property cards
   2. rest is unauthorised.
   3. if you try to create or edit a property. you will prompted unathorised.

## 4. Property cards

1. create: includes community, building and unitNo fields (all together they are unique).
   community and buildings have hard coded enums values. for community (CommunityA, CommunityB), for building (BuildingA, BuildingA). you can select any one value.
   unitNo fields can be any value.
   validation: all required fields, duplicate property
2. edit: same as create, validation: all required fields, duplicate property
3. delete property from property card action column. once delete the customer who has link to this property. that customer property will be remove.

## 5. customers (leads) cards

1. create: includes name, email and property link. validation: all required fields, duplicate customer
2. edit: same as create except you cannot edit email, validation: all required fields, duplicate customer

## Getting Started locally

First, install node modules and add .env file:

```bash
npm install

Add DATABASE_URL of your mongodb
NEXTAUTH_SECRET="NEXTAUTH_SECRET"

# run
npm run dev
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dev server.

Open [http://localhost:5555](http://localhost:5555) with your browser to see the prisma studio.

1. in prima studio go to role and create two roles Admin and Customer.
2. then rest process is same as described for live demo.
