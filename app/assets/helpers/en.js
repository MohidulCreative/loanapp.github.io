var CONST_FORM_FIELDS = {
    "STATES": {
        "class": "form-control required",
        "name": "state",
        "id": "state",
        "type": "select",
        "label": "Province",
        "placeholder": "Choose...",
        "options": CONST_CA_STATES,
        'parentClass': "col-md-6 hide"
    },
    "CITY": {
        "class": "form-control required",
        "name": "city",
        "id": "city",
        "type": "text",
        "label": "City",
        "placeholder": "City",
        'parentClass': "col-md-6 hide"
    },
    "ADDRESS": {
        "class": "form-control required",
        "name": "address",
        "id": "address",
        "type": "text",
        "label": "Address",
        "placeholder": "Your address",
        'parentClass': "col-md-6"
    },
    "ADDRESS_MONTHS": {
        "class": "form-control required",
        "name": "address_length_months",
        "id": "address_length_months",
        "type": "select",
        "label": "Time At Address",
        "placeholder": "Choose...",
        "options": {
            "6": "6 Months or Less",
            "12": "7-12 Months",
            "18": "13-18 Months",
            "24": "19-24 Months",
            "25": "2-5 Years",
            "60": "5 Years or More"
        },
        'parentClass': "col-md-6"
    },
    "LOAN_PURPOSE": {
        "class": "form-control required",
        "parentClass": "col-md-6",
        "name": "product_purpose",
        "id": "product_purpose",
        "type": "select",
        "label": "Loan Purpose",
        "placeholder": "Choose...",
        "options": {
            "Debt Consolidation": "Debt Consolidation",
            "Credit Card Consolidation": "Credit Card Payoff",
            "Car Repair": "Car Maintenance",
            "Home Improvement": "Home Improvement",
            "Utility Bill": "Utility Bill",
            /*"Home Buying" : "Home Buying",*/
            "School Expenses": "School Expenses",
            "Major Purchase": "Major Purchase",
            "Vacation": "Vacation",
            "Moving or Relocation": "Moving or Relocation",
            "Medical Expenses": "Medical Expenses",
            "Cosmetic Surgery": "Cosmetic Surgery",
            "Wedding Expenses": "Wedding Expenses",
            "Credit Building": "Credit Building",
            "Emergency Expense": "Emergency Expense",
            "Other": "Other"
        }
    },
    "LOAN_PURPOSE_CAR_REPAIR_HIDDEN": {
        "name": "product_purpose",
        "id": "product_purpose",
        "class": "",
        "type": "hidden",
        "default_value": "Car Repair",
    },
    "LOAN_PURPOSE_CENTER": {
        "class": "form-control required hide-for-short-version",
        "parentClass": "col-md-6 col-md-offset-3",
        "name": "product_purpose",
        "id": "product_purpose",
        "type": "select",
        "label": "Loan Purpose",
        "placeholder": "Choose...",
        "options": {
            "Debt Consolidation": "Debt Consolidation",
            "Credit Card Consolidation": "Credit Card Payoff",
            "Car Repair": "Car Maintenance",
            "Home Improvement": "Home Improvement",
            "Utility Bill": "Utility Bill",
            /*"Home Buying" : "Home Buying",*/
            "School Expenses": "School Expenses",
            "Major Purchase": "Major Purchase",
            "Vacation": "Vacation",
            "Moving or Relocation": "Moving or Relocation",
            "Medical Expenses": "Medical Expenses",
            "Cosmetic Surgery": "Cosmetic Surgery",
            "Wedding Expenses": "Wedding Expenses",
            "Credit Building": "Credit Building",
            "Emergency Expense": "Emergency Expense",
            "Other": "Other"
        }
    },
    "LOAN_PURPOSE_NO_CAR_REPAIR_CENTER": {
        "class": "form-control required",
        "parentClass": "col-md-6 col-md-offset-3",
        "name": "product_purpose",
        "id": "product_purpose",
        "type": "select",
        "label": "Loan Purpose",
        "placeholder": "Choose...",
        "options": {
            "Debt Consolidation": "Debt Consolidation",
            "Credit Card Consolidation": "Credit Card Payoff",
            "Home Improvement": "Home Improvement",
            "Utility Bill": "Utility Bill",
            /*"Home Buying" : "Home Buying",*/
            "School Expenses": "School Expenses",
            "Major Purchase": "Major Purchase",
            "Vacation": "Vacation",
            "Moving or Relocation": "Moving or Relocation",
            "Medical Expenses": "Medical Expenses",
            "Cosmetic Surgery": "Cosmetic Surgery",
            "Wedding Expenses": "Wedding Expenses",
            "Credit Building": "Credit Building",
            "Emergency Expense": "Emergency Expense",
            "Other": "Other"
        }
    },
    "DOB": {
        "class": "form-control date dob validate_dob required",
        "name": "dob",
        "id": "dob",
        "type": "text",
        "label": "Date of Birth",
        "placeholder": "1985-06-27",
        'parentClass': "col-md-6"
    },
    "PAY_DATE1": {
        "class": "form-control date paydate1 required hide-for-short-version",
        "name": "pay_date1",
        "id": "pay_date1",
        "type": "text",
        "label": "Next Pay Date",
        "placeholder": "2017-01-01",
        'parentClass': "col-md-6"
    },
    "PAY_DATE2": {
        "class": "form-control date paydate2 required hide-for-short-version",
        "name": "pay_date2",
        "id": "pay_date2",
        "type": "text",
        "label": "Pay Date After The Next",
        "placeholder": "2017-01-15",
        'parentClass': "col-md-6"
    },
    "SSN": {
        "class": "form-control required digits",
        "name": "ssn",
        "id": "ssn",
        "type": "text",
        "label": "Social Security Number",
        "placeholder": "123456789",
        "maxlength": 9,
        "minlength": 9,
        'parentClass': "col-md-6"
    },
    "PHONE": {
        "class": "form-control required validate-phone digits",
        "name": "home_phone",
        "id": "home_phone",
        "type": "text",
        "label": "Primary Phone",
        "placeholder": "Phone",
        "maxlength": 10,
        "minlength": 10,
        'parentClass': "col-md-6"
    },
    "CELL_PHONE": {
        "class": "form-control required validate-phone digits",
        "name": "cell_phone",
        "id": "cell_phone",
        "type": "text",
        "label": "Secondary Phone",
        "placeholder": "Phone",
        "maxlength": 10,
        "minlength": 10,
        'parentClass': "col-md-6"
    },
    "WORK_PHONE": {
        "class": "form-control required validate-phone digits hide-for-short-version",
        "name": "work_phone",
        "id": "work_phone",
        "type": "text",
        "label": "Work Phone",
        "placeholder": "Phone",
        "maxlength": 10,
        "minlength": 10,
        'parentClass': "col-md-6"
    },
    "EMAIL": {
        "class": "form-control required email validate_email",
        "name": "email",
        "id": "email",
        "type": "text",
        "label": "Email",
        "placeholder": "your@email.com",
        'parentClass': "col-md-6",
        "input-group-addon": {
            "class": "fa fa-envelope"
        }
    },
    "EMAIL_CONFIRM": {
        "class": "form-control required email validate_email",
        "name": "confirm_email",
        "id": "confirm_email",
        "type": "text",
        "label": "Confirm Email",
        "equalTo": "#email",
        "placeholder": "your@email.com",
        'parentClass': "col-md-6",
        "input-group-addon": {
            "class": "fa fa-envelope"
        }
    },
    "LAST_NAME": {
        "class": "form-control required",
        "name": "last_name",
        "id": "last_name",
        "type": "text",
        "label": "Last Name",
        "placeholder": "Last Name",
        'parentClass': "col-md-6"
    },
    "FIRST_NAME": {
        "class": "form-control required",
        "name": "first_name",
        "id": "first_name",
        "type": "text",
        "label": "First Name",
        "placeholder": "First Name",
        'parentClass': "col-md-6"
    },
    "ZIP": {
        "class": "form-control required digits",
        "name": "zip",
        "id": "zip",
        "type": "text",
        "label": "Enter Your ZIP Code",
        "placeholder": "ZIP",
        "maxlength": 5,
        "minlength": 5
    },
    "POSTAL_CODE": {
        "class": "form-control required validate_postal",
        "name": "postal_code",
        "id": "postal_code",
        "type": "text",
        "label": "Enter Your Postal Code",
        "parentClass": "col-md-6 col-sm-12",
        "placeholder": "A9A9A9",
        "maxlength": 6,
        "minlength": 6
    },
    "POSTAL_CODE_CENTER": {
        "class": "form-control required validate_postal",
        "name": "postal_code",
        "id": "postal_code",
        "type": "text",
        "label": "Enter Your Postal Code",
        "parentClass": "col-md-6 col-md-offset-3 col-sm-12",
        "placeholder": "A9A9A9",
        "maxlength": 6,
        "minlength": 6
    },
    "PROPERTY_POSTAL_CODE_CENTER": {
        "class": "form-control required validate_postal",
        "name": "postal_code",
        "id": "postal_code",
        "type": "text",
        "label": "Property Postal Code",
        "parentClass": "col-md-6 col-md-offset-3 col-sm-12",
        "placeholder": "A9A9A9",
        "maxlength": 6,
        "minlength": 6
    },
    "INCOME_CENTER": {
        "class": "form-control required digits",
        "name": "monthly_income",
        "id": "monthly_income",
        "type": "text",
        "label": "Monthly Income",
        "parentClass": "col-md-6 col-md-offset-3 col-sm-12",
        "placeholder": "Monthly Pre-Tax Income",
        "maxlength": 5
    },
    "INCOME": {
        "class": "form-control required digits",
        "name": "monthly_income",
        "id": "monthly_income",
        "type": "text",
        "label": "Monthly Income",
        "parentClass": "col-md-6 col-sm-12",
        "placeholder": "Monthly Pre-Tax Income",
        "maxlength": 5
    },
    "CAR_REQUEST_TYPE": {
        "class": "car-type required",
        "name": "car_request_type",
        "id": "car_request_type",
        "type": "select-btn",
        "label": "Select the type of car you want",
        "labelContainer": "<h4></h4>",
        "labelContainerClass": "text-center",
        "parentContainerClass": "col-sm-12",
        "options": {
            "sedan": {
                "class": "car-type-btn btn-secondary",
                "id": "car-type-sedan",
                "value": "sedan",
                "label": "Sedan",
            },
            "suv": {
                "class": "car-type-btn btn-secondary",
                "id": "car-type-suv",
                "value": "suv",
                "label": "SUV",
            },
            "van": {
                "class": "car-type-btn btn-secondary",
                "id": "car-type-van",
                "value": "van",
                "label": "Van",
            },
            "truck": {
                "class": "car-type-btn btn-secondary",
                "id": "car-type-truck",
                "value": "truck",
                "label": "Truck",
            },
            "luxury": {
                "class": "car-type-btn btn-secondary",
                "id": "car-type-luxury",
                "value": "luxury",
                "label": "Luxury",
            },
            "unknown": {
                "class": "car-type-btn btn-secondary",
                "id": "credit-score-unknown",
                "value": "unknown",
                "label": "Decide Later",
            }
        }
    },
    "CAR_REQUEST_MONTHLY_BUDGET": {
        "class": "car-budget required",
        "name": "car_request_monthly_budget",
        "id": "car_request_monthly_budget",
        "type": "select-btn",
        "label": "What's your monthly budget?",
        "labelContainer": "<h4></h4>",
        "labelContainerClass": "text-center",
        "parentContainerClass": "col-sm-12",
        "options": {
            "200": {
                "class": "car-request-btn btn-secondary",
                "id": "car-request-200",
                "value": "200",
                "label": "Up to $200",
            },
            "350": {
                "class": "car-request-btn btn-secondary",
                "id": "car-request-350",
                "value": "350",
                "label": "$201 - $350",
            },
            "500": {
                "class": "car-request-btn btn-secondary",
                "id": "car-request-500",
                "value": "500",
                "label": "$351 - $500",
            },
            "1000": {
                "class": "car-request-btn btn-secondary",
                "id": "car-request-1000",
                "value": "1000",
                "label": "$501 or more",
            },
        }
    },
    "CREDIT_SCORE": {
        "class": "credit-score required",
        "name": "credit_score",
        "id": "credit_score",
        "type": "select-btn",
        "label": "What is your credit score?",
        "labelContainer": "<h4></h4>",
        "labelContainerClass": "text-center",
        "parentContainerClass": "col-md-12",
        "options": {
            "Good": {
                "class": "credit-score-btn btn-secondary",
                "id": "credit-score-good",
                "value": "good",
                "label": "720 +<br>Good",
            },
            "Fair": {
                "class": "credit-score-btn btn-secondary",
                "id": "credit-score-fair",
                "value": "fair",
                "label": "581 - 720<br>Fair",
            },
            "low": {
                "class": "credit-score-btn btn-secondary",
                "id": "credit-score-low",
                "value": "low",
                "label": "&lt; 580<br>Low",
            },
            "Unknown": {
                "class": "credit-score-btn btn-secondary",
                "id": "credit-score-excellent",
                "value": "unknown",
                "label": "???<br>Not Sure",
            }
        }
    },
    "EMPLOYMENT": {
        "class": "required",
        "name": "income_type",
        "id": "income_type",
        "type": "select-btn",
        "label": "Select your main income source",
        "labelContainer": "<h4></h4>",
        "labelContainerClass": "text-center",
        "parentContainerClass": "col-md-12",
        "options": {
            "Full-Time": {
                "class": "btn-employment-full-time btn-secondary",
                "id": "employment-full-time",
                "value": "full_time",
                "label": "Full-Time",
            },
            "Part-Time": {
                "class": "btn-employment-part-time btn-secondary",
                "id": "employment-part-time",
                "value": "part_time",
                "label": "Part-Time",
            },
            "Self-Employed": {
                "class": "btn-employment-self-employed btn-secondary",
                "id": "employment-self-employed",
                "value": "self_employed",
                "label": "Self-Employed",
            },
            "Gig-Worker": {
                "class": "btn-employment-gig-worker btn-secondary",
                "id": "employment-gig-worker",
                "value": "gig_worker",
                "label": "Gig Worker",
            },
            "Disability": {
                "class": "btn-employment-disability btn-secondary",
                "id": "btn-employment-disability",
                "value": "disability",
                "label": "Disability",
            },
            "Social-Security": {
                "class": "btn-employment-social_security btn-secondary",
                "id": "btn-employment-social_security",
                "value": "social_security",
                "label": "BENEFITS / EI / CERB",
            },
            "Retired": {
                "class": "btn-employment-retired btn-secondary",
                "id": "employment-retired",
                "value": "retired",
                "label": "Retired",
            },
            "Other": {
                "class": "btn-employment-other  btn-secondary",
                "id": "employment-other",
                "value": "unemployed",
                "label": "Not Working",
            }
        }
    },
    "JOB_MONTHS": {
        "class": "form-control required hide-for-short-version",
        "name": "employed_months",
        "id": "employed_months",
        "type": "select",
        "label": "Time At Job",
        "placeholder": "Choose...",
        "options": {
            "2": "Less than 3 months",
            "6": "3-6 Months",
            "12": "7-12 Months",
            "18": "13-18 Months",
            "24": "19-24 Months",
            "48": "2-5 Years",
            "60": "5 Years or More"
        },
        'parentClass': "col-md-6"
    },
    "MONTHLY_RENT": {
        "class": "form-control required digits hide-for-short-version",
        "name": "rent_mortgage_payment",
        "id": "rent_mortgage_payment",
        "type": "text",
        "label": "Rent/Mortgage Payment",
        "placeholder": "Enter monthly amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6"
    },
    "MORTGAGE": {
        "class": "form-control required digits hide-for-short-version",
        "name": "property_mortgage",
        "id": "property_mortgage",
        "type": "text",
        "label": "Property Mortgage",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6"
    },
    "PROP_YR_PURCHASED": {
        "class": "form-control required digits",
        "name": "property_year_of_purchase",
        "id": "property_year_of_purchase",
        "type": "text",
        "label": "Property Year of Purchase",
        "placeholder": "Enter year",
        'parentClass': "col-md-6",
        "minlength": 4,
        "maxlength": 4
    },
    "MORTGAGE_INTEREST_RATE": {
        "class": "form-control required number",
        "name": "property_mortgage_interest_rate",
        "id": "property_mortgage_interest_rate",
        "type": "text",
        "label": "Mortgage Interest Rate",
        "placeholder": "E.g. 3.25",
        'parentClass': "col-md-6",
        "input-group-addon": {
            "class": "fa fa-percent",
        }
    },
    "MORTGAGE_RATE_TYPE": {
        "class": "form-control required",
        "name": "property_mortgage_interest_rate_type",
        "id": "property_mortgage_interest_rate_type",
        "type": "select",
        "label": "Rate Type",
        "placeholder": "Choose...",
        "options": {
            "fixed_closed": "Fixed Closed",
            "fixed_open": "Fixed Open",
            "variable_closed": "Variable Closed",
            "variable_open": "Variable Open"
        },
        'parentClass': "col-md-6"
    },
    "MORTGAGE_LATE_PAYMENTS_CENTER": {
        "class": "form-control required",
        "name": "property_mortgage_late_payments_last_year",
        "id": "property_mortgage_late_payments_last_year",
        "type": "select",
        "label": "Have you made any late mortgage payments in the last 12 months?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
        },
        'parentClass': "col-md-6 col-md-offset-3"
    },
    "CAR_VALUE": {
        "class": "form-control digits required",
        "name": "car_value",
        "id": "car_value",
        "type": "text",
        "maxlength": 5,
        "label": "Car Value",
        "placeholder": "Enter value",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6"
    },
    "CAR_MILEAGE": {
        "class": "form-control digits required",
        "name": "car_mileage",
        "id": "car_mileage",
        "type": "text",
        "maxlength": 6,
        "label": "Car Mileage (KMs)",
        "placeholder": "Enter KM's (e.g. 65000)",
        'parentClass': "col-md-6"
    },
    "CAR_DEBT": {
        "class": "form-control digits required",
        "name": "car_debt",
        "id": "car_debt",
        "type": "text",
        "maxlength": 5,
        "label": "Car Financing Balance",
        "placeholder": "Enter balance",
        'parentClass': "col-md-6",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
    },
    "CAR_YEAR": {
        "class": "form-control digits required",
        "name": "car_year",
        "id": "car_year",
        "type": "text",
        "maxlength": 4,
        "minlength": 4,
        "label": "Car Year",
        "placeholder": "e.g. 2012",
        'parentClass': "col-md-6",
    },
    "CAR_YEAR_CBB": {
        "class": "form-control required",
        "name": "car_year",
        "id": "car_year",
        "type": "select",
        "label": "Car Year",
        "placeholder": "Choose...",
        "options": {
            "2004": "2004",
            "2005": "2005",
            "2006": "2006",
            "2007": "2007",
            "2008": "2008",
            "2009": "2009",
            "2010": "2010",
            "2011": "2011",
            "2012": "2012",
            "2013": "2013",
            "2014": "2014",
            "2015": "2015",
            "2016": "2016",
            "2017": "2017",
            "2017": "2017",
            "2018": "2018",
            "2018": "2018",
            "2019": "2019",
            "2020": "2020",
            "2021": "2021",
        },
        "parentClass": "col-md-6",
    },
    "CAR_MAKE_CBB": {
        "class": "form-control required",
        "name": "car_make",
        "id": "car_make",
        "type": "select",
        "label": "Car Make",
        "placeholder": "Choose...",
        "options": {},
        "parentClass": "col-md-6 col-md-offset-3",
    },
    "CAR_MAKE": {
        "class": "form-control required",
        "name": "car_make",
        "id": "car_make",
        "type": "text",
        "maxlength": 50,
        "label": "Car Make",
        "placeholder": "Volkswagen",
        "options": {},
        "parentClass": "col-md-6",
    },
    "CAR_MODEL": {
        "class": "form-control required",
        "name": "car_model",
        "id": "car_model",
        "type": "text",
        "maxlength": 50,
        "label": "Car Model",
        "placeholder": "Golf",
        "options": {},
        "parentClass": "col-md-6",
    },
    "CAR_MODEL_CBB": {
        "class": "form-control required",
        "name": "car_model",
        "id": "car_model",
        "type": "select",
        "label": "Car Model",
        "placeholder": "Choose...",
        "options": {},
        "parentClass": "col-md-6 col-md-offset-3",
    },
    "CAR_TRIM_CBB": {
        "class": "form-control required",
        "name": "car_trim",
        "id": "car_trim",
        "type": "select",
        "label": "Car Trim",
        "placeholder": "Choose...",
        "options": {},
        "parentClass": "col-md-6 col-md-offset-3",
    },
    "CAR_STYLE_CBB": {
        "class": "form-control required",
        "name": "car_style",
        "id": "car_style",
        "type": "select",
        "label": "Car Style",
        "placeholder": "Choose...",
        "options": {},
        "parentClass": "col-md-6 col-md-offset-3",
    },
    "GARAGE_NAME": {
        "class": "form-control",
        "name": "garage_name",
        "id": "garage_name",
        "type": "text",
        "label": "Auto Shop Name",
        "placeholder": "Enter Auto Shop Name",
        "options": {},
        "parentClass": "col-md-6 col-md-offset-3",
    },
    "HOME_VALUE": {
        "class": "form-control required digits hide-for-short-version",
        "name": "property_value",
        "id": "property_value",
        "type": "text",
        "label": "Property Value",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6"
    },
    "HOME_CITY_VALUE": {
        "class": "form-control required digits",
        "name": "property_municipal_value",
        "id": "property_municipal_value",
        "type": "text",
        "label": "Property Municipal Value",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6"
    },
    "MONTHLY_EXPENSES": {
        "class": "form-control required digits",
        "name": "monthly_expenses",
        "id": "monthly_expenses",
        "type": "text",
        "label": "Other monthly expenses",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
            "popover": {
                "icon": "fa fa-question-circle",
                "placement": "top",
                "title": "Information",
                "content": "Enter your total monthly expenses other than your rent/mortgage payment."
            },
        },
        'parentClass': "col-md-6"
    },
    "IN_DMP": {
        "class": "form-control required",
        "name": "in_dmp",
        "id": "in_dmp",
        "type": "select",
        "label": "Are you currently in a debt program?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
            "discharged": "Discharged",
        },
        'parentClass': "col-md-6"
    },
    "IN_CONSUMER_PROPOSAL": {
        "class": "form-control required",
        "name": "in_consumer_proposal",
        "id": "in_consumer_proposal",
        "type": "select",
        "label": "Are you currently in a consumer proposal?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
            "discharged": "Discharged",
        },
        'parentClass': "col-md-6"
    },
    "IN_CONSUMER_PROPOSAL_CENTER": {
        "class": "form-control required hide-for-short-version",
        "name": "in_consumer_proposal",
        "id": "in_consumer_proposal",
        "type": "select",
        "label": "Are you currently in a consumer proposal?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
            "discharged": "Discharged",
        },
        'parentClass': "col-md-8 col-md-offset-2"
    },
    "IN_BANKRUPTCY": {
        "class": "form-control required",
        "name": "in_bankruptcy",
        "id": "in_bankruptcy",
        "type": "select",
        "label": "Are you currently in bankruptcy?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
            "discharged": "Discharged",
        },
        'parentClass': "col-md-6"
    },
    "IN_DMP_CENTER": {
        "class": "form-control required hide-for-short-version",
        "name": "in_dmp",
        "id": "in_dmp",
        "type": "select",
        "label": "Are you currently in a debt program?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
            "discharged": "Discharged",
        },
        'parentClass': "col-md-8 col-md-offset-2"
    },
    "IN_BANKRUPTCY_CENTER": {
        "class": "form-control required hide-for-short-version",
        "name": "in_bankruptcy",
        "id": "in_bankruptcy",
        "type": "select",
        "label": "Are you currently in bankruptcy?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
            "discharged": "Discharged",
        },
        'parentClass': "col-md-8 col-md-offset-2"
    },
    "HAS_PAYDAY_DEBT": {
        "class": "form-control required",
        "name": "has_payday_loans",
        "id": "has_payday_loans",
        "type": "select",
        "label": "Do you have any payday loans?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes",
        },
        'parentClass': "col-md-6"
    },
    "PAYDAY_DEBT": {
        "class": "form-control required digits",
        "name": "payday_loan_debt_amount",
        "id": "payday_loan_debt_amount",
        "type": "text",
        "label": "Enter your payday loan debt amount",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6"
    },
    "CC_DEBT_CENTER": {
        "class": "form-control required digits",
        "name": "cc_debt_amount",
        "id": "cc_debt_amount",
        "type": "text",
        "label": "Credit Card Debt Amount",
        "placeholder": "Enter your debt amount",
        "maxlength": 6,
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6 col-md-offset-3"
    },
    "CC_DEBT": {
        "class": "form-control required digits",
        "name": "cc_debt_amount",
        "id": "cc_debt_amount",
        "type": "text",
        "label": "Credit Card Debt Amount",
        "placeholder": "Enter your debt amount",
        "maxlength": 6,
        'parentClass': "col-md-6",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
    },
    "UNSECURED_DEBT_CENTER": {
        "class": "form-control required digits",
        "name": "unsecured_debt_amount",
        "id": "unsecured_debt_amount",
        "type": "text",
        "label": "Total Other Unsecured Debt",
        "placeholder": "Enter your debt amount",
        "maxlength": 6,
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
            "popover": {
                "icon": "fa fa-question-circle",
                "placement": "top",
                "title": "Information",
                "content": "Enter any other unsecured debt you may have (personal or payday loans, department store cards, debt in collections, unpaid rent or bills, etc.)"
            },
        },
        'parentClass': "col-md-8 col-md-offset-2"
    },
    "UNSECURED_DEBT": {
        "class": "form-control required digits",
        "name": "unsecured_debt_amount",
        "id": "unsecured_debt_amount",
        "type": "text",
        "label": "Total Other Unsecured Debt",
        "placeholder": "Enter your debt amount",
        "maxlength": 6,
        'parentClass': "col-md-6",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
            "popover": {
                "icon": "fa fa-question-circle",
                "placement": "top",
                "title": "Information",
                "content": "Enter any other unsecured debt you may have (personal or payday loans, department store cards, debt in collections, unpaid rent or bills, etc.)"
            },
        },
    },
    "MONTHLY_LOAN_PAYMENTS": {
        "class": "form-control required digits",
        "name": "monthly_loan_payments",
        "id": "monthly_loan_payments",
        "type": "text",
        "label": "Total monthly loan payments",
        "placeholder": "Enter your monthly loan payments amount",
        "maxlength": 6,
        'parentClass': "col-md-6",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
            "popover": {
                "icon": "fa fa-question-circle",
                "placement": "top",
                "title": "Information",
                "content": "Total monthly loan payments, excluding mortgage and car loan payments. Enter 0 if you do not have any outstanding unsecured loans."
            },
        },
    },
    "TAX_DEBT": {
        "class": "form-control required digits",
        "name": "tax_debt_amount",
        "id": "tax_debt_amount",
        "type": "text",
        "label": "How much do you owe?",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        }
    },
    "TOTAL_DEBT": {
        "class": "form-control required digits",
        "name": "total_debt_amount",
        "id": "total_debt_amount",
        "type": "text",
        "label": "How much debt do you have?",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        }
    },
    "SLC_DEBT": {
        "class": "form-control required digits",
        "name": "slc_debt_amount",
        "id": "slc_debt_amount",
        "type": "text",
        "label": "How much student loan debt do you have?",
        "placeholder": "Enter amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        }
    },
    "LOAN_AMOUNT": {
        "class": "form-control digits required",
        "name": "requested_amount",
        "id": "requested_amount",
        "type": "text",
        "label": "Desired Loan Amount",
        "placeholder": "Loan Amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        }
    },
    "LOAN_AMOUNT_CENTER": {
        "class": "form-control digits required",
        "name": "requested_amount",
        "parentClass": "col-md-6 col-md-offset-3",
        "id": "requested_amount",
        "type": "text",
        "label": "Desired Loan Amount",
        "placeholder": "Loan Amount",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        }
    },
    "JOB_TITLE": {
        "class": "form-control required hide-for-short-version",
        "name": "job_title",
        "id": "job_title",
        "type": "text",
        "label": "Occupation",
        "placeholder": "Job Title",
        'parentClass': "col-md-6",
    },
    "EMPLOYER": {
        "class": "form-control required hide-for-short-version",
        "name": "employer",
        "id": "employer",
        "type": "text",
        "label": "Employer Name",
        "placeholder": "Employer name",
        'parentClass': "col-md-6",
    },
    "ACTIVE_MILITARY": {
        "class": "form-control required",
        "name": "active_military",
        "id": "active_military",
        "type": "select",
        "label": "Are you actively in the military?",
        "placeholder": "Choose...",
        'parentClass': "col-md-6",
        "options": {
            "yes": "Yes",
            "no": "No"
        }
    },
    "OWN_CAR": {
        "class": "form-control required",
        "name": "own_car",
        "id": "own_car",
        "type": "select",
        "label": "Do you have a car?",
        "placeholder": "Choose...",
        'parentClass': "col-md-6",
        "options": {
            "own": "Own",
            "finance": "Finance",
            "lease": "Lease",
            "no": "No"
        }
    },
    "OWN_CAR_LMTD": {
        "class": "form-control required",
        "name": "own_car",
        "id": "own_car",
        "type": "select",
        "label": "Car Ownership Status",
        "placeholder": "Choose...",
        'parentClass': "col-md-6",
        "options": {
            "own": "Own",
            "finance": "Finance",
            "lease": "Lease"
        }
    },
    "OWN_HOME": {
        "class": "form-control required",
        "name": "own_home",
        "id": "own_home",
        "type": "select",
        "label": "Do you rent or own?",
        "placeholder": "Choose...",
        'parentClass': "col-md-6",
        "options": {
            "no": "Rent",
            "yes": "Own"
        }
    },
    "SELL_HOME": {
        "class": "form-control required",
        "name": "wants_to_sell_home",
        "id": "wants_to_sell_home",
        "type": "select",
        "label": "Would you be interested in speaking with a real estate agent about selling your home?",
        "placeholder": "Choose...",
        'parentClass': "col-md-8 col-md-offset-2 text-center",
        "options": {
            "no": "No",
            "yes": "Yes"
        }
    },
    "DIRECT_DEPOSIT": {
        "class": "form-control required hide-for-short-version",
        "name": "direct_deposit",
        "id": "direct_deposit",
        "type": "select",
        "label": "Do you have direct deposit?",
        'parentClass': "col-md-6",
        "placeholder": "Choose...",
        "options": {
            "yes": "Yes",
            "no": "No"
        }
    },
    "PAY_FREQUENCY": {
        "class": "form-control required hide-for-short-version",
        "name": "pay_frequency",
        "id": "pay_frequency",
        "type": "select",
        "label": "Pay Frequency",
        "placeholder": "Choose...",
        'parentClass': "col-md-6",
        "options": {
            "WEEKLY": "Weekly",
            "BIWEEKLY": "Bi-Weekly",
            "TWICEMONTHLY": "Semi-Monthly",
            "MONTHLY": "Monthly"
        }
    },
    "BANK_ACCOUNT_TYPE": {
        "class": "form-control required",
        "name": "bank_account_type",
        "id": "bank_account_type",
        "type": "select",
        "label": "Bank Account Type",
        'parentClass': "col-md-6",
        "placeholder": "Choose...",
        "options": {
            "CHECKING": "Checking",
            "SAVING": "Savings"
        }
    },
    "BANK_ACCOUNT_NUM": {
        "class": "form-control digits required",
        "name": "bank_account_number",
        "id": "bank_account_number",
        "type": "text",
        "minlength": 7,
        "maxlength": 11,
        "label": "Bank Account Number",
        'parentClass': "col-md-6",
        "placeholder": "Choose...",
    },
    "BANK_NAME": {
        "class": "form-control required",
        "name": "bank_name",
        "id": "bank_name",
        "type": "text",
        "label": "Bank Name",
        'parentClass': "col-md-6",
        "placeholder": "Choose...",
    },
    "BANK_ABA": {
        "class": "form-control digits required",
        "name": "bank_aba",
        "id": "bank_aba",
        "type": "text",
        "minlength": 5,
        "maxlength": 5,
        "label": "Routing/Transit Number",
        'parentClass': "col-md-6",
        "placeholder": "Choose...",
    },
    "BANK_INSTITUTION_NUMBER": {
        "class": "form-control digits required",
        "name": "bank_institution_number",
        "id": "bank_institution_number",
        "type": "text",
        "minlength": 3,
        "maxlength": 3,
        "label": "Institution Number",
        'parentClass': "col-md-6",
        "placeholder": "e.g. 002",
    },
    "BANK_MONTHS": {
        "class": "form-control required",
        "name": "bank_account_length_months",
        "id": "bank_account_length_months",
        "type": "select",
        "label": "Months of Account Use",
        "placeholder": "Choose...",
        "options": {
            "6": "6 Months or Less",
            "12": "7-12 Months",
            "18": "13-18 Months",
            "24": "19-24 Months",
            "25": "2-5 Years",
            "60": "5 Years or More"
        },
        'parentClass': "col-md-6"
    },
    "HAVE_ATTORNEY": {
        "class": "form-control required",
        "name": "have_attorney",
        "id": "have_attorney",
        "type": "select",
        "label": "Do you have an attorney?",
        "placeholder": "Choose...",
        'parentClass': "col-md-12",
        "options": {
            "yes": "Yes",
            "no": "No"
        }
    },
    "SPEAK_WITH_ATTORNEY": {
        "class": "form-control required",
        "name": "speak_with_attorney",
        "id": "speak_with_attorney",
        "type": "select",
        "label": "Have you spoken with an attorney?",
        "placeholder": "Choose...",
        'parentClass': "col-md-12",
        "options": {
            "yes": "Yes",
            "no": "No"
        }
    },
    "COMPANY_NAME": {
        "class": "form-control required",
        "name": "company_name",
        "id": "company_name",
        "type": "text",
        "label": "Company Name",
        "placeholder": "Company Name",
        "parentClass": "col-md-6"
    },
    "COMPANY_PAY_PROCESSOR": {
        "class": "form-control required",
        "name": "payment_processor",
        "id": "payment_processor",
        "type": "select",
        "label": "Who is your payment processor?",
        "placeholder": "Choose...",
        "options": {
            "CHASE_PAYMENTECH": "CHASE PAYMENTECH",
            "DEBITECH": "DEBITECH",
            "DESJARDINS": "DESJARDINS",
            "ELAVON": "ELAVON",
            "EVERLINK": "EVERLINK",
            "FIRST_DATA": "FIRST DATA",
            "GLOBAL_PAYMENTS": "GLOBAL PAYMENTS",
            "MERCURY_PAYMENTS": "MERCURY PAYMENTS",
            "MONERIS": "MONERIS",
            "MONEX": "MONEX",
            "PAYFIRMA": "PAYFIRMA",
            "PIVOTAL_PAYMENTS": "PIVOTAL PAYMENTS",
            "POS_WEST": "POS WEST",
            "SQUARE": "SQUARE",
            "STRIPE": "STRIPE",
            "TD_MERCHANT_SERVICES": "TD MERCHANT SERVICES",
            "OTHER": "AUTRE",
            "NONE": "AUCUN"
        },
        "parentClass": "col-md-6"
    },
    "COMPANY_MONTHLY_REV": {
        "class": "form-control required digits",
        "name": "monthly_gross_sales",
        "id": "monthly_gross_sales",
        "type": "text",
        "maxlength": 8,
        "label": "Gross Sales (Monthly)",
        "placeholder": "50000",
        "parentClass": "col-md-6"
    },
    "BUSINESS_INCOME_NOA1": {
        "class": "form-control required digits",
        "name": "income_noa_1",
        "id": "income_noa_1",
        "type": "text",
        "maxlength": 8,
        "label": "Notice of Assement (NOA)<br>Income last year",
        "placeholder": "60000",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        "parentClass": "col-md-6"
    },
    "BUSINESS_INCOME_NOA2": {
        "class": "form-control required digits",
        "name": "income_noa_2",
        "id": "income_noa_2",
        "type": "text",
        "maxlength": 8,
        "label": "Notice of Assement (NOA) <br>Income year before last",
        "placeholder": "50000",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        "parentClass": "col-md-6"
    },
    "CANADIAN_STATUS": {
        "class": "form-control required",
        "name": "canadian_status",
        "id": "canadian_status",
        "type": "select",
        "label": "Are you a Canadian citizen / permanent resident ?",
        "placeholder": "Choose...",
        "options": {
            "yes": "Yes",
            "no": "No",
        },
        "parentClass": "col-md-12"
    },
    "BUSINESS_EQUITY_LIQUID": {
        "class": "form-control required digits",
        "name": "equity_liquid",
        "id": "equity_liquid",
        "type": "text",
        "maxlength": 8,
        "label": "Liquid equity <br>(cash, stocks, bonds, ETFs)",
        "placeholder": "20000",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        "parentClass": "col-md-6"
    },
    "BUSINESS_EQUITY_NON_LIQUID": {
        "class": "form-control required digits",
        "name": "equity_non_liquid",
        "id": "equity_non_liquid",
        "type": "text",
        "maxlength": 8,
        "label": "Non-liquid equity <br>(equipment, real estate, vehicles)",
        "placeholder": "50000",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        "parentClass": "col-md-6"
    },
    "COMPANY_MONTHLY_DEBIT_CREDIT": {
        "class": "form-control required digits",
        "name": "monthly_card_sales",
        "id": "monthly_card_sales",
        "type": "text",
        "maxlength": 8,
        "label": "Gross Sales (Debit & Credit Only)",
        "placeholder": "From debit/credit cards",
        "parentClass": "col-md-6"
    },
    "COMPANY_TIME_IN_BUSINESS": {
        "class": "form-control required",
        "name": "months_in_business",
        "id": "months_in_business",
        "type": "select",
        "label": "Time in Business",
        "placeholder": "Choose...",
        "options": {
            "0": "Start Up (No time in business)",
            "11": "Less than 12 months",
            "18": "12-18 Months",
            "24": "19-24 Months",
            "25": "2-5 Years",
            "60": "5 Years or More"
        },
        "parentClass": "col-md-6"
    },
    "COMPANY_TIME_IN_BUSINESS_CENTER": {
        "class": "form-control required",
        "name": "months_in_business",
        "id": "months_in_business",
        "type": "select",
        "label": "Time in Business",
        "placeholder": "Choose...",
        "options": {
            "0": "Start Up (No time in business)",
            "11": "Less than 12 months",
            "18": "12-18 Months",
            "24": "19-24 Months",
            "25": "2-5 Years",
            "60": "5 Years or More"
        },
        "parentClass": "col-md-6 col-md-offset-3"
    },
    "COMPANY_START_DATE": {
        "class": "form-control date start_biz required",
        "name": "business_start_date",
        "id": "business_start_date",
        "type": "text",
        "label": "Business Start Date",
        "placeholder": "2012-06-28",
        "parentClass": "col-md-6"
    },
    "COMPANY_START_DATE_CENTER": {
        "class": "form-control date start_biz required",
        "name": "business_start_date",
        "id": "business_start_date",
        "type": "text",
        "label": "Business Start Date",
        "placeholder": "2012-06-28",
        "parentClass": "col-md-6 col-md-offset-3"
    },
    "BUSINESS_BANKRUPTCY": {
        "class": "form-control required",
        "name": "business_bankruptcy",
        "id": "business_bankruptcy",
        "type": "select",
        "label": "Does your business have any bankruptcy cases or tax liens?",
        "placeholder": "Choose...",
        "options": {
            "yes": "Yes",
            "no": "No",
        },
        "parentClass": "col-md-6"
    },
    "SOLE_PROPRIETOR": {
        "class": "form-control required",
        "name": "is_sole_proprietor",
        "id": "is_sole_proprietor",
        "type": "select",
        "label": "Are you the sole proprietor of your business?",
        "placeholder": "Choose...",
        "options": {
            "yes": "Yes",
            "no": "No",
        },
        "parentClass": "col-md-6"
    },
    "HAS_BIZ_BANK_ACCOUNT": {
        "class": "form-control required",
        "name": "has_business_bank_account",
        "id": "has_business_bank_account",
        "type": "select",
        "label": "Do you have a business bank account?",
        "placeholder": "Choose...",
        "options": {
            "yes": "Yes",
            "no": "No",
        },
        "parentClass": "col-md-6"
    },
    "TITLE": {
        "class": "form-control required",
        "name": "title",
        "id": "title",
        "type": "select",
        "label": "Salutation",
        "placeholder": "Choose...",
        'parentClass': "col-md-6",
        "options": {
            "mr": "Mr",
            "ms": "Ms",
            "mrs": "Mrs"
        }
    },
    "COMPANY_INDUSTRY": {
        "class": "form-control required",
        "name": "business_type",
        "id": "business_type",
        "type": "select",
        "label": "Industry",
        "placeholder": "Choose...",
        "options": {
            "ACCOUNTING": "ACCOUNTING",
            "AGRICULTURE_FARMING": "AGRICULTURE FARMING",
            "ANIMAL_BOARDING": "ANIMAL BOARDING",
            "APPAREL_ACCESSORIES": "APPAREL ACCESSORIES",
            "AUTO_TRUCK_DEALERSHIP": "AUTO TRUCK DEALERSHIP",
            "AUTO_BODY": "AUTO BODY",
            "AUTO_RENTAL": "AUTO RENTAL",
            "BEAUTY_SALON_BARBER_SHOP": "BEAUTY SALON BARBER SHOP",
            "BUILDING_MATERIALS": "BUILDING MATERIALS",
            "BUSINESS_SERVICES": "BUSINESS SERVICES",
            "CAR_WASH": "CAR WASH",
            "CELLULAR_WIRELESS_STORE": "CELLULAR WIRELESS STORE",
            "CHILD_EDUCATION": "CHILD EDUCATION",
            "CONSULTING": "CONSULTING",
            "DAY_CARE_SERVICES": "DAY CARE SERVICES",
            "DOCTOR": "DOCTOR",
            "ELECTRONICS_COMPUTERS": "ELECTRONICS COMPUTERS",
            "ENTERTAINMENT": "ENTERTAINMENT",
            "EQUIPMENT_RENTAL": "EQUIPMENT RENTAL",
            "FABRICATION": "FABRICATION",
            "FINANCIAL_SERVICES": "FINANCIAL SERVICES",
            "FRANCHISE": "FRANCHISE",
            "FUNERAL_HOME": "FUNERAL HOME",
            "GAMING": "GAMING",
            "GAS_STATION": "GAS STATION",
            "GENERAL_CONTRACTOR": "GENERAL CONTRACTOR",
            "GENERAL_MERCHANDISE_STORE": "GENERAL MERCHANDISE STORE",
            "GROCERY_CONVENIENCE_STORE": "GROCERY CONVENIENCE STORE",
            "GUNS_AMMUNITION_STORE": "GUNS AMMUNITION STORE",
            "GYM_FITNESS_TRAINER": "GYM FITNESS TRAINER",
            "HEALTH_SERVICES": "HEALTH SERVICES",
            "HOME_FURNISHINGS": "HOME FURNISHINGS",
            "HOTEL_MOTEL": "HOTEL/MOTEL",
            "HVAC": "HVAC",
            "INSURANCE_BROKERS": "INSURANCE BROKERS",
            "INTERNET_RETAILER": "INTERNET RETAILER",
            "LANDSCAPING_SERVICES": "LANDSCAPING SERVICES",
            "LAUNDRY_GARMENT_SERVICES": "LAUNDRY GARMENT SERVICES",
            "LAW_FIRM": "LAW FIRM",
            "LEGAL_COUNSEL": "LEGAL COUNSEL",
            "LOCKSMITH": "LOCKSMITH",
            "MANUFACTURING": "MANUFACTURING",
            "MARKETING": "MARKETING",
            "MEDIA_PRODUCTION": "MEDIA PRODUCTION",
            "MEDICAL_HEALTHCARE": "MEDICAL HEALTHCARE",
            "NAIL_SALON": "NAIL SALON",
            "OIL_INDUSTRY": "OIL INDUSTRY",
            "OTHER": "OTHER",
            "PHOTOGRAPHY_STUDIO": "PHOTOGRAPHY STUDIO",
            "POOL_SERVICES": "POOL SERVICES",
            "PRINTING": "PRINTING",
            "REAL_ESTATE_RELATED": "REAL ESTATE RELATED",
            "RECREATION": "RECREATION",
            "RESIDENTIAL_CONTRACTOR": "RESIDENTIAL CONTRACTOR",
            "RESTAURANT_CAFE_BAR": "RESTAURANT CAFE BAR",
            "RETAIL_STORE": "RETAIL STORE",
            "SANITATION": "SANITATION",
            "SECURITY_SERVICES": "SECURITY SERVICES",
            "SENIOR_CARE_ASSISTED_LIVING": "SENIOR CARE ASSISTED LIVING",
            "SMOKE_SHOP": "SMOKE SHOP",
            "SOLAR": "SOLAR",
            "SPA_SERVICES": "SPA SERVICES",
            "STAFFING": "STAFFING",
            "TANNING_SALON": "TANNING SALON",
            "TAX_PREPARATION": "TAX PREPARATION",
            "TECHNOLOGY_COMPANY": "TECHNOLOGY COMPANY",
            "TRAVEL_TRANSPORTATION": "TRAVEL TRANSPORTATION",
            "UNIFORM_SUPPLIER": "UNIFORM SUPPLIER",
            "VETERINARY_CLINIC": "VETERINARY CLINIC",
            "WASTE_MANAGEMENT": "WASTE MANAGEMENT",
            "WHOLESALER": "WHOLESALER",
            "WINE_LIQUOR_STORE": "WINE LIQUOR STORE"
        },
        "parentClass": "col-md-6"
    },
    "COMPANY_INDUSTRY_POS": {
        "class": "form-control required",
        "name": "business_type",
        "id": "business_type",
        "type": "select",
        "label": "Industry",
        "placeholder": "Choose...",
        "options": {
            "RETAIL": "RETAIL",
            "HOME_IMPROVEMENT": "HOME IMPROVEMENT",
            "POWERSPORTS": "POWERSPORTS",
            "AUTOMOTIVE": "AUTOMOTIVE",
            "HEALTHCARE": "HEALTHCARE",
            "OTHER": "OTHER",
        },
        "parentClass": "col-md-6"
    },
    "CHK_TERMS": {
        "class": "required",
        "name": "AgreeToTerms",
        "id": "AgreeToTerms",
        "type": "checkbox",
        "label": "I agree to the terms and privacy policy."
    },
    "UID": {
        "name": "unique_id",
        "id": "unique_id",
        "class": "",
        "type": "hidden",
    },
    "LA_DUPLICATE": {
        "name": "la_duplicate",
        "id": "la_duplicate",
        "class": "",
        "type": "hidden",
    },
    "CREDIT_AUTH": {
        "class": "required",
        "name": "credit_auth",
        "id": "credit_auth",
        "type": "checkbox",
        "value": "1",
        "label": "<small>In order to maximize my chance of finding a service provider, I authorize the trusted financial services provider I've been matched with to obtain credit reports from credit reporting agencies to assess my credit history. My consent is valid until I notify the matched provider of its withdrawal.</small>"
    },
    "CREDIT_AUTH_CAR": {
        "class": "required",
        "name": "credit_auth",
        "id": "credit_auth",
        "type": "checkbox",
        "value": "1",
        "label": "<small>I expressly allow the dealership and service providers of the dealership in the field of credit and loan services to collect, use, disclose and retain personal information about me for the purposes of facilitating the supply of financial credit scoring and options services through means that include profiling, automated recommendations and decision-making based on relevant factors regarding borrowers, and of continuously improving such means.<br><br>My consent is valid until I notify the dealership of its withdrawal, subject to legal or contractual restrictions and reasonable notice.</small>"
    },
    "OPT_IN": {
        "class": "",
        "name": "opt_in",
        "id": "opt_in",
        "type": "checkbox",
        "label": "<small>I would like to receive electronic messages from Loans Canada containing news, updates and promotions regarding its products and services, including third party promotions (you can withdraw your consent at any time). This request is made by Loans Canada, situated in 1801-1 Yonge Street, Toronto, ON, M5E 1W7. Email communications are sent via Loans Canada's mailing systems.</small>"
    },
    "ASSET_TYPE_COMMERCIAL": {
        "class": "form-control required",
        "name": "asset_type",
        "id": "asset_type",
        "type": "select",
        "label": "Asset Type",
        "options": {
            "Inventory": "Inventory",
            "Machinery": "Machinery",
            "Industrial Equipment": "Industrial Equipment",
            "Farm Equipment": "Farming Equipment",
            "Retail Equipment": "Retail Equipment",
            "Restaurant Equipment": "Restaurant Equipment",
            "IT-Office Equipment": "IT/Office Equipment",
            "Commercial Vehicle": "Commercial Vehicle",
            "Tractor": "Tractor",
            "Forklift": "Forklift",
            "Excavator": "Excavator/Construction Vehicle",
            "Truck": "Big Rig or Truck",
            "Other": "Other asset, please specify"
        },
        "placeholder": "Choose...",
        'parentClass': "col-md-6"
    },
    "ASSET_TYPE": {
        "class": "form-control required",
        "name": "asset_type",
        "id": "asset_type",
        "type": "select",
        "label": "Asset Type",
        "options": {
            "Motorcycle": "Motorcycle",
            "Snowmobile": "Snowmobile",
            "Boat": "Boat",
            "Other Water Vehicle": "Other Water Vehicle",
            "Trailer": "Trailer",
            "RV": "Recreational Vehicle",
            "Jewelry": "Jewelry",
            "Antique": "Antique",
            "Other": "Other asset, please specify"
        },
        "placeholder": "Choose...",
        'parentClass': "col-md-6"
    },
    "ASSET_TYPE_CUSTOM": {
        "class": "form-control required",
        "name": "asset_type_custom",
        "id": "asset_type_custom",
        "type": "text",
        "label": "Describe Your Asset",
        "placeholder": "",
        'parentClass': "col-md-6"
    },
    "ASSET_VALUE": {
        "class": "form-control digits required",
        "name": "asset_value",
        "id": "asset_value",
        "type": "text",
        "label": "Asset Value",
        "placeholder": "",
        'parentClass': "col-md-6"
    },
    "ASSET_FINANCED": {
        "class": "form-control required",
        "name": "asset_financed",
        "id": "asset_financed",
        "type": "select",
        "label": "Is Asset Financed?",
        "placeholder": "Choose...",
        "options": {
            "yes": "Yes",
            "no": "No"
        },
        'parentClass': "col-md-6"
    },
    "ASSET_FINANCING_AMOUNT": {
        "class": "form-control digits required",
        "name": "asset_financing_amount",
        "id": "asset_financing_amount",
        "type": "text",
        "label": "Asset Financing Amount",
        "placeholder": "",
        'parentClass': "col-md-6"
    },
    "PURCHASE_PRICE": {
        "class": "form-control digits required",
        "name": "purchase_price",
        "id": "purchase_price",
        "type": "text",
        "label": "Purchase Price of the Property",
        "placeholder": "e.g. 250000",
        'parentClass': "col-md-6"
    },
    "PURCHASE_PRICE_CENTER": {
        "class": "form-control digits required",
        "name": "purchase_price",
        "id": "purchase_price",
        "type": "text",
        "label": "Purchase Price of the Property",
        "placeholder": "e.g. 250000",
        'parentClass': "col-md-8 col-md-offset-2"
    },
    "DOWN_PAYMENT": {
        "class": "form-control digits required",
        "name": "mortgage_downpayment",
        "id": "mortgage_downpayment",
        "type": "text",
        "label": "Down Payment Amount",
        "placeholder": "",
        'parentClass': "col-md-6"
    },
    "DOWN_PAYMENT_CENTER": {
        "class": "form-control digits required",
        "name": "mortgage_downpayment",
        "id": "mortgage_downpayment",
        "type": "text",
        "label": "Down Payment Amount",
        "placeholder": "",
        'parentClass': "col-md-6 col-md-offset-3"
    },
    "NEW_PURCHASE_FINANCING": {
        "class": "form-control required",
        "name": "new_asset_name",
        "id": "new_asset_name",
        "type": "select",
        "label": "What do you want to finance?",
        "options": {
            "motorcycle": "Motorcycle",
            "scooter": "Scooter",
            "atv": "ATV",
            "rv": "RV/Motorhome",
            "boat": "Marine vehicle/Boat",
            "powersport_vehicle": "Other powersport vehicle",
            "jewelry": "Jewelry",
            "collectable": "Collectable item",
            "other_vehicle": "Other vehicle/machinery",
            "other": "Other"
        },
        "placeholder": "Choose...",
        'parentClass': "col-md-6"
    },
    "NEW_PURCHASE_FINANCING_COMMERCIAL": {
        "class": "form-control required",
        "name": "new_asset_name",
        "id": "new_asset_name",
        "type": "text",
        "label": "Describe The Asset",
        "placeholder": "Describe Purchase Item",
        'parentClass': "col-md-6"
    },
    "NEW_PURCHASE_FINANCING_DESCRIPTION": {
        "class": "form-control required",
        "name": "asset_type_custom",
        "id": "asset_type_custom",
        "type": "text",
        "label": "Asset Description",
        "placeholder": "",
        'parentClass': "col-md-6"
    },
    "NEW_PURCHASE_PRICE": {
        "class": "form-control digits required",
        "name": "new_asset_value",
        "id": "new_asset_value",
        "type": "text",
        "label": "Asset Purchase Price",
        "placeholder": "Full value of item",
        'parentClass': "col-md-6"
    },
    "NEW_PURCHASE_FINANCING_AMOUNT": {
        "class": "form-control digits required",
        "name": "requested_amount",
        "id": "requested_amount",
        "type": "text",
        "label": "Requested Financing Amount",
        "placeholder": "Cash required for purchase",
        'parentClass': "col-md-6"
    },
    "NEW_PURCHASE_FINANCING_DESIRED": {
        "class": "form-control digits required",
        "name": "asset_financing_amount",
        "id": "asset_financing_amount",
        "type": "text",
        "label": "Desired Financing Amount",
        "placeholder": "",
        'parentClass': "col-md-6"
    },
    "REQUESTED_AMOUNT_RTO_CENTER": {
        "class": "form-control digits required",
        "name": "requested_amount",
        "id": "requested_amount",
        "type": "text",
        "label": "Product Cost",
        "placeholder": "",
        'parentClass': "col-md-6 col-md-offset-3"
    },
    "HAS_PROOF_OF_INCOME": {
        "class": "form-control required",
        "name": "has_proof_of_income",
        "id": "has_proof_of_income",
        "type": "select",
        "label": "Do you have proof of income?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes"
        },
        'parentClass': "col-md-6"
    },
    "HAS_PROOF_OF_INCOME_BTN": {
        "class": "form-control required",
        "name": "has_proof_of_income",
        "id": "has_proof_of_income",
        "type": "select-btn",
        "label": "Do you have proof of income?",
        "labelContainer": "<h4></h4>",
        "labelContainerClass": "text-center",
        "parentContainerClass": "col-md-12",
        "options": {
            "Full-Time": {
                "class": "btn-income-proof-no btn-secondary",
                "id": "btn-income-proof-no",
                "value": "no",
                "label": "No",
            },
            "Part-Time": {
                "class": "btn-income-proof-yes btn-secondary",
                "id": "btn-income-proof-yes",
                "value": "yes",
                "label": "Yes",
            }
        },
    },
    "HAS_OTHER_MORTGAGE": {
        "class": "form-control required",
        "name": "has_other_mortgage",
        "id": "has_other_mortgage",
        "type": "select",
        "label": "Do you have another mortgage?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes"
        },
        'parentClass': "col-md-6"
    },
    "HAS_COSIGNER": {
        "class": "form-control required",
        "name": "has_cosigner",
        "id": "has_cosigner",
        "type": "select",
        "label": "Do you have a cosigner?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes"
        },
        'parentClass': "col-md-6"
    },
    "PURCHASE_PROPERTY_STATUS": {
        "class": "form-control required",
        "name": "purchase_property_status",
        "id": "purchase_property_status",
        "type": "select",
        "label": "Have you found a property to purchase?",
        "placeholder": "Choose...",
        "options": {
            "found_property": "Property Found",
            "offer_accepted": "Property Found & Offer Accepted",
            "still_looking": "Still looking",
        },
        'parentClass': "col-md-6"
    },
    "PROPERTY_PURCHASE_PURPOSE": {
        "class": "form-control required",
        "name": "property_purchase_purpose",
        "id": "property_purchase_purpose",
        "type": "select",
        "label": "Purpose of Property Purchase",
        "placeholder": "Choose...",
        "options": {
            "residential": "Residential Property",
            "investment": "Investment Property",
        },
        'parentClass': "col-md-6"
    },
    "HAS_REAL_ESTATE_AGENT": {
        "class": "form-control required",
        "name": "working_with_real_estate_agent",
        "id": "working_with_real_estate_agent",
        "type": "select",
        "label": "Are you working with a real estate agent?",
        "placeholder": "Choose...",
        "options": {
            "no": "No",
            "yes": "Yes"
        },
        'parentClass': "col-md-6"
    },
    "HOME_TYPE": {
        "class": "form-control required",
        "name": "home_type",
        "id": "home_type",
        "type": "select",
        "label": "Type of Property",
        "placeholder": "Choose...",
        "options": {
            "condo": "Condo",
            "house": "House",
            "townhouse": "Row / Townhouse",
            "duplex": "Duplex",
            "triplex": "Triplex",
            "mobile_home": "Mobile Home",
            "commercial": "Commercial",
            "other": "Other",
        },
        'parentClass': "col-md-6"
    },
    "CURRENT_LOAN_LENDER": {
        "class": "form-control required",
        "name": "current_loan_lender",
        "id": "current_loan_lender",
        "type": "text",
        "maxlength": 50,
        "label": "Lender",
        "placeholder": "Your Current Lender",
        "options": {},
        "parentClass": "col-md-6",
    },
    "CURRENT_LOAN_RATE": {
        "class": "form-control digits required",
        "name": "current_loan_rate",
        "id": "current_loan_rate",
        "type": "text",
        "maxlength": 2,
        "label": "Current Loan Rate",
        "placeholder": "22",
        "input-group-addon": {
            "class": "fa fa-percent",
        },
        'parentClass': "col-md-6"
    },
    "CURRENT_LOAN_MONTHLY_PAYMENT": {
        "class": "form-control digits required",
        "name": "current_loan_monthly_payment",
        "id": "current_loan_monthly_payment",
        "type": "text",
        "maxlength": 5,
        "label": "Monthly Payment",
        "placeholder": "1850",
        "input-group-addon": {
            "class": "fa fa-dollar-sign",
        },
        'parentClass': "col-md-6"
    },
    "CURRENT_LOAN_REMAINING_MONTHS": {
        "class": "form-control required",
        "name": "current_loan_remaining_months",
        "id": "current_loan_remaining_months",
        "type": "text",
        "maxlength": 3,
        "label": "Remaining Months",
        "placeholder": "24",
        'parentClass': "col-md-6"
    },
    "LOAN_DISCLAIMER": "<div class='clearfix'></div><div class='col-md-12'><small>By continuing with this form, you understand, agree and authorize that (1) your information may be sent to lenders on your behalf, and (2) such lenders may obtain consumer reports and related information about you from one or more consumer reporting agencies such as TransUnion, Experian and Equifax.</small></div>",
    "FOOTER_DISCLAIMER": "<div class='clearfix'></div><div class='text-center'><small>By continuing with this form, you consent, acknowledge, and agree to our <a href='https://loanscanada.ca/privacy-policy' target='_blank'>privacy policy</a> including LoansCanada.ca and/or its other partners contacting you by phone or e-mail to respond to (or request feedback from) your request.</small></div>",
    "FOOTER_CAR_DISCLAIMER": "<div class='text-center col-md-12' style='margin-top:30px;'><small>Please note there is no cost or obligation after you submit your application. If you wish, you can change your choice of car at a later time. </small></div>",
    "FOOTER_CREDIT_DISCLAIMER": "<div class='text-center col-md-12' style='margin-top:30px;'><small>Don't know your credit score? <a href='https://loanscanada.ca/app/go/credit-verify' target='_blank' rel='nofollow'>Click here</a> to access your credit score.</small></div>",
    "FOOTER_MORTGAGE_DISCLAIMER": "<div class='text-center col-md-12' style='margin-top:30px;'><small>Note: Loans Canada does not arrange or underwrite mortgages, we are a comparison and simple referral platform. Filling out this form will connect you with a licensed third party in your area who can answer your questions free of charge or commitment.</small></div>"
};