#lang racket/base
(require web-server/servlet-env
         web-server/http
         web-server/dispatchers/dispatch)

;; how to build out for a more production environment?

(serve/servlet (lambda (_)
                 (next-dispatcher))
               #:servlet-path "/"
               #:extra-files-paths (list (build-path "static"))
               #:port 5000
               #:launch-browser? #f)
