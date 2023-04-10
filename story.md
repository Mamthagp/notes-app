# Backend
### VERSION 1
## User
* _id
* username
* email
* password
* createdAt
* updatedAt

## Budget
* _id
* amount - default - 0
* userId
* createdAt
* updatedAt

## Category
* _id
* name
* userId
* createdAt
* updatedAt

Category.find({ userId: req.user._id})

## Expense
* _id
* name
* amount
* description
* expenseDate
* categoryId
* userId
* createdAt
* updatedAt

Expense.find({ userId: req.user._id})

### VERSION 2
## Profile
* name
* age
* bio
* profileUrl
* createdAt
* updateAt

( embed profile to user )

## Expense
* invoiceUrl

# Front End

* Redux for application state management

## Reducers
* userReducers
* budget
* categoryReducers
* expenses

