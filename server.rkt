#lang racket/base
(require web-server/servlet-env
         web-server/http
         web-server/dispatchers/dispatch)

;; how to build out for a more production environment?
#|---------------------------------------------------------

- routes
  # /profileName
    + GET
      - to be retrieved upon successful sign in
      - queried at totals page
    + POST
      - insert new Profile into DB, setting up proper 
        tables
    + PUT
      - update profile
    + DELETE
  # /profileName/shift
    + GET 
      - currentShift retrieved if app exited
      - queried at totals page
    + POST
      - entry created at the start of a shift
    + PUT
      - entry updated upon every completed run?
        # posts info from finished run & its deliveries
    + DELETE
  # /profileName/options
    + GET
      - retieves current option settings when user signs in
    + POST
      - entry created when new user created, default values 
        inserted
    + PUT
      - entry updated when user updates options
    + DELETE
  # /profileName/run
    + GET 
      - currentRun retrieved if app exited
      - queried at totals page
    + POST
      - entry created when user ends a run, part of 
        shift-PUT?
    + DELETE
      - when/where to delete?
  # /profileName/delivery
    + GET
      - queried at totals page
    + POST
      - entry created with shift-PUT
    + DELETE
      - when/where?


----------------------------------------------------------
-------- Apache Configuration ----------------------------

- using racket w/ apache server requires enabling a mod 
  for racket usage:
    $ sudo a2enmod [hypothetical-racket-mod]

---------------------------------------------------------|#


(serve/servlet (lambda (_)
                 (next-dispatcher))
               #:servlet-path "/"
               #:extra-files-paths (list (build-path "static"))
               #:port 5000
               #:launch-browser? #f)
