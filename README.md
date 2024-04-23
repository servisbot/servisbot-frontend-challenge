# Welcome!
Thank you for taking the time to participate in this code challenge!

Feel free to fork this repo, or create your own repo and complete the task below.

## Note
* You are free to use whatever technologies you wish to complete the task
* You are encouraged to handle the provided data sets in a way that is efficient, and that best meets the requirements of application features specified below.
* You are **not** required to produce a production ready application, this is a chance to showcase your abilities - so do try show what you know!
* You are **not** required to write any backend apis - you can create an application layer that returns data from the provided (or your own modified) data structures
* Comments or notes are more than welcome

## Introduction

Within this repo, you will find a **data** directory. This contains some dummy data that you can use within your application. Please take some time to familiarize yourself with this data structure, as it may impact your choices and application significantly.


### Bot Data Model

A Bot definition looks like this
```json
{
  "id": "04140c19-0c46-43c6-8e78-f459cd3b3370",       // Immutable Required UUID
  "name": "Bot One",                                  // Mutable Required String
  "description": "First Bot",                         // Mutable Optional String
  "status": "DISABLED",                               // Mutable Required String Enum ["DISABLED", "ENABLED", "PAUSED"]
  "created": 1713809849892                            // Immutable Required Epoch Timestamp
}
```

### Worker Data Model

A Worker definition looks like this
```json
{
  "id": "6f4fdfd9-da33-4711-9386-579e8101dc43",       // Immutable Required UUID
  "name": "Worker One",                               // Mutable Required String
  "description": "First Worker",                      // Mutable Optional String
  "bot": "Bot One",                                   // Mutable Required String - references a unique bot
  "created": 1713773401591                            // Immutable Required Epoch Timestamp
}
```

### Log Data Model

A Log definition looks like this
```json
{
  "id": "a3922ad6-49ed-4cf3-8293-cc4d58a5d4c9",        // Immutable Required UUID
  "created": "2024-04-22T14:14:14.926Z",               // Immutable Required ISO Timestamp
  "message": "Some Message",                           // Mutable Required String
  "bot": "44700aa2-cba6-43d2-9ad4-8d8a499bd356",       // Immutable Required UUID - references a unique bot
  "worker": "e5d7874c-fd2d-41b8-abc1-2e311964ae8c"     // Immutable Required UUID - references a unique worker
}
```

## Data Model Relationships (Cardinality)

The data relationship is as follows
* Bot 1:M Worker
* Bot 1:M Log
* Worker 1:M Log


## The Challenge!

Create an application that implements the following features
* View the list of bots
* View the list of workers for a bot
* View the list of logs for a bot
* View the list of logs for a worker associated with a bot

There are no wireframes or design considerations specified.
You are free to apply a UI/UX that delivers an intuitive application experience for the feature set above.
