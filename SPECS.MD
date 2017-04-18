# Delivery App (web app v1)

## Todos:
* Finish mock construction, need Profile and User
* Test all mock objects
* Build DB schema and functions for working with models and the DB
* Create & test routes for server API
* Build server
* Frontend ...

### Considerations:
* What to do with empty/unfinished data during app usage?
* Create a generic model object
..* ability to add strings, numbers to object's properties
..* can push to properties' arrays

### Data Structures:
1. Delivery (collects user info for a specific delivery)
* Date: start time
* Date: end time
* String: credit card or cash (boolean? true for one, false for other)
* Float: tip amount
* Float: delivery fee (if any, allow for user to set delivery fee)
* Float: mileage (google maps)

2. Weather (collects weather info for a specific run)
* Date: weather info collected at start of run
* String: city name
* String: conditions (specific value? 0 = cloudy, 1 = rain, 2 = clear ...)
* Float: current temperature

3. Run (collects info when user is out for multiple deliveries at once)
* Date: start time (start of first delivery as well)
* Date: end time (end of last delivery)
* (?)foreign table(?): points to collection of Deliveries
* (?)foreign table(?): points to weather info for Run

4. Shift (collects info about the entire shift)
* Date: start of shift
* Date: end of shift
* Float: hourly wage
* (?)foreign table(?): points to collection of Runs
* (?)Totals(?): easy access of shift totals? tips/hourly/mileage/etc..

5. Profile (collects info about a specific profile)
* String: personal name
* String: password (does this even get stored in the DB?)
* String: company name
* String: default location (which will be used to deduce timezone)
* Float: hourly wage
* Float: delivery fee (if any or if flat or variable rate)
* (?)foreign table(?): points to collection of Shifts

6. User (info about a specific user, maybe overkill now)
* String: user name
* String: password
* (?)foreign table(?): collection of profiles


