
(function ($) {

    /**
     * 
     * DOM READY
     * 
     **/
    $(function () {
      var currentTab = 0; // Current tab is set to be the first tab (0)
      showTab(currentTab); // Display the current tab
  
      // Auto generating today's date for user
      document.getElementById("00N3l00000FRF68").value = getTodayDate();
      document.getElementById("00N3l00000FRBs9").value = getTodayDate();
      document.getElementById("00N3l00000FRBsJ").value = getTodayDate();
  
      function showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        x[n].style.display = "block";
        //... and fix the Previous/Next buttons:
        if (n == 0) {
          document.getElementById("prevBtn").style.display = "none";
        } else {
          document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
          document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
          document.getElementById("nextBtn").innerHTML = "Next";
        }
        //... and run a function that will display the correct step indicator:
        fixStepIndicator(n);
      }
  
      function nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // Scroll to the top of the page
        if (currentTab > 0) {
          scrollTop();
        }
        // if reached to the last tab pull in the IP registry of user
        if (currentTab == 2) {
          // Get data
          getIpRegistry();
  
        }
        // if you have reached the end of the form...
        if (currentTab >= x.length) {
          // ... the form gets submitted:
          document.getElementById("regForm").submit();
          return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab);
      }
  
      function getCookie(name) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
        // Loop through the array elements
        for (var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");
          // Removing whitespace at the beginning of the cookie name
          // and compare it with the given string
          if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
          }
        }
        // Return null if not found
        return null;
      }
  
      function getIpRegistry() {
        /**
          * if data already exist or hasn't been deleted from cookies
          * then no need to hit the API Endpoint again
          */
        if (getCookie('_i__f')) {
          // Supporting data for first authorizer
          document.getElementById("00N3l00000FRF6I").value = getCookie('_i__f');
          document.getElementById("00N3l00000FRF6N").value = getCookie('_r__f');
          document.getElementById("00N3l00000FRF6D").value = getCookie('_g__f');
          // Supporting data for first guarantor
          document.getElementById("00N3l00000FRF4v").value = getCookie('_i__f');
          document.getElementById("00N3l00000FRF4q").value = getCookie('_r__f');
          document.getElementById("00N3l00000FRF4l").value = getCookie('_g__f');
          // Supporting data for second guarantor
          document.getElementById("00N3l00000FRF5A").value = getCookie('_i__f');
          document.getElementById("00N3l00000FRF55").value = getCookie('_r__f');
          document.getElementById("00N3l00000FRF50").value = getCookie('_g__f');
        } else {
  
          var xhttp = new XMLHttpRequest();
  
          xhttp.onreadystatechange = function () {
            // if successful gather data
            if (this.readyState == 4 && this.status == 200) {
              var data = JSON.parse(this.response);
              // console.log('this response', JSON.parse(this.response));
              var ipData = data.ip;
              var regionData = data.location.city + ", " + data.location.region.name + ", " + data.location.country.name + " " + data.location.postal;
              var geoData = data.location.latitude + ", " + data.location.longitude;
              var nowDate = new Date();
  
              nowDate.setHours(nowDate.getHours() + 1);// Set for 1 hour
  
              // Supporting data for first authorization
              document.getElementById("00N3l00000FRF6I").value = ipData;
              document.getElementById("00N3l00000FRF6N").value = regionData;
              document.getElementById("00N3l00000FRF6D").value = geoData;
              // Supporting data for first guarantor
              document.getElementById("00N3l00000FRF4v").value = ipData;
              document.getElementById("00N3l00000FRF4q").value = regionData;
              document.getElementById("00N3l00000FRF4l").value = geoData;
              // Supporting data for second guarantor
              document.getElementById("00N3l00000FRF5A").value = ipData;
              document.getElementById("00N3l00000FRF55").value = regionData;
              document.getElementById("00N3l00000FRF50").value = geoData;
  
              // Adding to cookies if applicant decides to finish application later of the day
              document.cookie = "_i__f=" + encodeURIComponent(ipData) + '; expires=' + nowDate.toUTCString() + "; path=/";// cookie expires in 1 hour
              document.cookie = "_r__f=" + encodeURIComponent(regionData) + '; expires=' + nowDate.toUTCString() + "; path=/";// cookie expires in 1 hour
              document.cookie = "_g__f=" + encodeURIComponent(geoData) + '; expires=' + nowDate.toUTCString() + "; path=/";// cookie expires in 1 hour
            }
          };
  
          xhttp.open("GET", "https://api.ipregistry.co/?key=zglx1l74tzm816", true);
          xhttp.send();
  
        }// if / else
  
      }
  
      function getTodayDate() {
        var today = new Date();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var year = today.getFullYear();
        // if current day is a single digit day
        if (day < 10) {
          day = '0' + day;// add zero to make day format
        }
        // if current month is a single digit month
        if (month < 10) {
          month = '0' + month;// add zero to make month format
        }
  
        return month + '/' + day + '/' + year;// Format: MM/DD/YYYY
      }
  
      function scrollTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
  
      function nameIsValid(name) {
        return /^[a-zA-Z]+$/.test(name);
      }
  
      function emailIsValid(email) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email);
      }
  
      function zipIsValid(zip) {
        return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
      }
  
      function currencyIsValid(amount) {
        return /^\d*(\.\d+)?$/.test(amount);
      }
  
      function invalidField(field) {
        // add an "invalid" class to the field:
        field.className += " invalid";
        return false;
      }
  
      function validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        y = x[currentTab].getElementsByClassName("form-field");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
          // If the required attribute is set to field
          if (y[i].getAttribute("required") !== null) {
            // If a field is empty...
            if (y[i].value.length < 2) {
              // and set the current valid status to false
              valid = invalidField(y[i]);
            } else if ((y[i].getAttribute("name") == "first_name" || y[i].getAttribute('name') == "last_name") && !nameIsValid(y[i].value)) {
              // and set the current valid status to false
              valid = invalidField(y[i]);
            } else if (y[i].getAttribute("type") == "tel" && y[i].value.length < 14) {
              // and set the current valid status to false
              valid = invalidField(y[i]);
            } else if (y[i].getAttribute("type") == "email" && !emailIsValid(y[i].value)) {
              // and set the current valid status to false
              valid = invalidField(y[i]);
            } else if (y[i].getAttribute("name") == "zip" && !zipIsValid(y[i].value)) {
              // and set the current valid status to false
              valid = invalidField(y[i]);
            } else if (y[i].getAttribute("name") == "00N3l00000FRBtM" && !currencyIsValid(y[i].value)) {
              // add an "invalid" class to the field:
              y[i].className += " invalid";
              // and set the current valid status to false
              valid = false;
            } else if (y[i].getAttribute("name") == "00N3l00000FRF68" && y[i].value.length < 10) { // DOB or Date
              valid = invalidField(y[i]);
            } else {
              y[i].classList.remove("invalid");
            }// if / else
          } else {
  
            if (y[i].value.length > 0) {
              // console.log("not required field", y[i]);
              if (y[i].getAttribute("type") == "text" && y[i].value.length < 2) {
                // and set the current valid status to false
                valid = invalidField(y[i]);
              } else if (y[i].getAttribute("type") == "tel" && y[i].value.length < 14) {
                // and set the current valid status to false
                valid = invalidField(y[i]);
              } else if (y[i].getAttribute("type") == "email" && !emailIsValid(y[i].value)) {
                // and set the current valid status to false
                valid = invalidField(y[i]);
              } else if ((y[i].getAttribute("name") == "00N1N00000FYdbm" || y[i].getAttribute('name') == "00N1N00000FYdbn") && !zipIsValid(y[i].value)) {
                // and set the current valid status to false
                valid = invalidField(y[i]);
              } else if ((y[i].getAttribute("name") == "00N1N00000FYddR" ||
                y[i].getAttribute("name") == "00N1N00000FYddS") &&
                y[i].value.length < 11) { // SSN
                // and set the current valid status to false
                valid = invalidField(y[i]);
              } else if ((y[i].getAttribute("name") == "00N1N00000FYdc0" ||
                y[i].getAttribute("name") == "00N3l00000FRBs9" ||
                y[i].getAttribute("name") == "00N1N00000FYdc1" ||
                y[i].getAttribute("name") == "00N3l00000FRBsJ") && 
                y[i].value.length < 10) { // DOB or Date
                // and set the current valid status to false
                valid = invalidField(y[i]);
              } else {
                y[i].classList.remove("invalid");
              }// if / else
            } else {
              y[i].classList.remove("invalid");
            }// if / else
          }// if / else
        }// for
  
        // Guarantor 1 required fields
        if (document.getElementById("00N1N00000FYdcg").value.length >= 2) {
          if (document.getElementById("00N1N00000FYdcp").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdcp"));// Last name
          }
          if (!emailIsValid(document.getElementById("00N1N00000FYdc3").value)) {
            valid = invalidField(document.getElementById("00N1N00000FYdc3"));// Email
          }
          if (document.getElementById("00N1N00000FYddR").value.length < 11) {
            valid = invalidField(document.getElementById("00N1N00000FYddR"));// SSN
          }
          if (document.getElementById("00N1N00000FYdc0").value.length < 10) {
            valid = invalidField(document.getElementById("00N1N00000FYdc0"));// DOB
          }
          if (document.getElementById("00N1N00000FYdd5").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdd5"));// Owned
          }
          if (document.getElementById("00N1N00000FYdcw").value.length < 14) {
            valid = invalidField(document.getElementById("00N1N00000FYdcw"));// Cell
          }
          if (document.getElementById("00N1N00000FYdbu").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdbu"));
          }
          if (document.getElementById("00N1N00000FYdbe").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdbe"));
          }
          if (document.getElementById("00N1N00000FYdbq").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdbq"));
          }
          if (document.getElementById("00N1N00000FYdbm").value.length < 5) {
            valid = invalidField(document.getElementById("00N1N00000FYdbm"));
          }
          if (document.getElementById("00N3l00000FRBsO").value == "0") {
            valid = invalidField(document.getElementById("00N3l00000FRBsO"));
          }
          if (document.getElementById("00N3l00000FRBs4").value.length < 2) {
            valid = invalidField(document.getElementById("00N3l00000FRBs4"));
          }
        }// if
  
        // Guarantor 2 required fields
        if (document.getElementById("00N1N00000FYdch").value.length >= 2) {
          if (document.getElementById("00N1N00000FYdcq").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdcq"));// Last name
          }
          if (!emailIsValid(document.getElementById("00N1N00000FYdc4").value)) {
            valid = invalidField(document.getElementById("00N1N00000FYdc4"));// Email
          }
          if (document.getElementById("00N1N00000FYddS").value.length < 11) {
            valid = invalidField(document.getElementById("00N1N00000FYddS"));// SSN
          }
          if (document.getElementById("00N1N00000FYdc1").value.length < 10) {
            valid = invalidField(document.getElementById("00N1N00000FYdc1"));// DOB
          }
          if (document.getElementById("00N1N00000FYdd6").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdd6"));// Owned
          }
          if (document.getElementById("00N1N00000FYdcx").value.length < 14) {
            valid = invalidField(document.getElementById("00N1N00000FYdcx"));// Cell
          }
          if (document.getElementById("00N1N00000FYdbv").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdbv"));// Address
          }
          if (document.getElementById("00N1N00000FYdbf").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdbf"));// City
          }
          if (document.getElementById("00N1N00000FYdbr").value.length < 2) {
            valid = invalidField(document.getElementById("00N1N00000FYdbr"));// State
          }
          if (document.getElementById("00N1N00000FYdbn").value.length < 5) {
            valid = invalidField(document.getElementById("00N1N00000FYdbn"));// Zip Code
          }
          if (document.getElementById("00N3l00000FRBsT").value == "0") {
            valid = invalidField(document.getElementById("00N3l00000FRBsT"));// I agree
          }
          if (document.getElementById("00N3l00000FRBsE").value.length < 2) {
            valid = invalidField(document.getElementById("00N3l00000FRBsE"));// Signature
          }
        }// if
  
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
          document.getElementsByClassName("step")[currentTab].className += " finish";
        }
        return valid; // return the valid status
      }
  
      var isNumericInput = function (event) {
        var key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
          (key >= 96 && key <= 105) // Allow number pad
        );
      };
  
      var isModifierKey = function (event) {
        var key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
          (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
          (key > 36 && key < 41) || // Allow left, up, right, down
          (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
          );
      };
  
      function enforceFormat(event) {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if (!isNumericInput(event) && !isModifierKey(event)) {
          event.preventDefault();
        }
      }
  
      function formatToPhone(event) {
        if (isModifierKey(event)) { return; }
  
        var target = event.target;
        var input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
        var zip = input.substring(0, 3);
        var middle = input.substring(3, 6);
        var last = input.substring(6, 10);
  
        if (input.length > 6) { target.value = '('+ zip +') ' + middle + '-'+ last; }
        else if (input.length > 3) { target.value = '('+ zip +') ' + middle; }
        else if (input.length > 0) { target.value = '('+ zip +')'; }
      }
  
      function formatSSN(event) {
        if (isModifierKey(event)) { return; }
  
        var target = event.target;
        var numbers = event.target.value.replace(/\D/g, '').substring(0, 9); // First nine digits of input only
  
        if (numbers.length > 4) {
          target.value = numbers.substring(0, 3) + '-' + numbers.substring(3, 5) + '-' + numbers.substring(5, 9);// e.g. 000-00-0000
        } else if (numbers.length > 2) {
          target.value = numbers.substring(0, 3) + '-' + numbers.substring(3, 5);// e.g. 000-000
        }
      }
  
      function formatFedTaxID(event) {
        if (isModifierKey(event)) { return; }
  
        var target = event.target;
        var numbers = event.target.value.replace(/\D/g, '').substring(0, 9); // First nine digits of input only
  
        if (numbers.length > 2) {
          target.value = numbers.substring(0, 2) + '-' + numbers.substring(2, 9);// e.g. 00-0000000
        }
      }
  
      function formatToDate(event) {
        if (isModifierKey(event)) { return; }
  
        var target = event.target;
        var input = event.target.value.replace(/\D/g, '').substring(0, 8); // First eight digits of input only
        var month = input.substring(0, 2);
        var day = input.substring(2, 4);
        var year = input.substring(4, 8);
  
        if (input.length > 4) { target.value = month + "/" + day + "/" + year; }
        else if (input.length > 2) { target.value = month + "/" + day; }
  
      }
  
      function fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
          x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class on the current step:
        x[n].className += " active";
      }
  
  
      /**
       * 
       * Event Listener
       * 
       */
      var allInputFields = document.querySelectorAll(".form-field");
  
      for (var e = 0; e < allInputFields.length; e++) {
        allInputFields[e].addEventListener('click', function (evt) {
          var _this = this;
          // Remove class name invalid once user clicks into field
          _this.classList.remove("invalid");
        });
      }// for

      document.getElementById('prevBtn').addEventListener('click', function(evt) {
        evt.preventDefault();

        nextPrev(-1);
      });

      document.getElementById('nextBtn').addEventListener('click', function(evt) {
        evt.preventDefault();

        nextPrev(1);
      });

      var allPhoneFields = document.querySelectorAll('.phone-number');

      for (var p = 0; p < allPhoneFields.length; p++) {
          var phoneField = allPhoneFields[p];

          phoneField.addEventListener('keyup', function(evt){
            formatToPhone(evt);
          });
    
          phoneField.addEventListener('keydown', function(evt){
            enforceFormat(evt);
          });
      }

      var allDateField = document.querySelectorAll('.field-date');

      for (var td = 0; td < allDateField.length; td++) {
          var dateField = allDateField[td];

          dateField.addEventListener('keyup', function(evt){
            formatToDate(evt);
          });
    
          dateField.addEventListener('keydown', function(evt){
            enforceFormat(evt);
          });
      }

      var allSSNField = document.querySelectorAll('.ssn-field');

      for (var s = 0; s < allSSNField.length; s++) {
          var ssnField = allSSNField[s];

          ssnField.addEventListener('keyup', function(evt){
            formatSSN(evt);
          });

          ssnField.addEventListener('keydown', function(evt){
            enforceFormat(evt);
          });
      }

      document.querySelector('.fed-tax-id').addEventListener('keyup', function(evt) {
        formatFedTaxID(evt);
      });

      document.querySelector('.fed-tax-id').addEventListener('keydown', function(evt){
        enforceFormat(evt);
      });

      document.getElementById('uploadQuoteBtn').addEventListener('click', function (evt) {
        evt.preventDefault();
        var _this = this;
        var addQuote = document.getElementById("addquote");
  
        if (addQuote.style.display === "none" || addQuote.style.display === "") {
          // Display section to upload quote
          addQuote.style.display = "block";
          _this.innerText = "Hide";
        } else {
          // Hide upload section
          addQuote.style.display = "none";
          _this.innerText = "Upload Quote";
        }// if / else
  
      });

      // Field: Business State hidden field
      document.getElementById('dealer-state').addEventListener('change', function() {
        // console.log('change this ', this.value);

        var _this       = this;
        var state       = _this.value;
        var dealersName = document.getElementById("dealer-name");
        var mainDealer  = document.getElementById("00N3l00000FREif");
        var dealerExist = false;
  
        mainDealer.innerHTML = '<option value="">--Dealer Name--</option>';
        document.getElementById('00N3l00000FRBrp').value = ''; // Sales Rep Name set to empty
  
        for (var i = 1; i < dealersName.length; i++) {
          var dealerValue       = dealersName[i].value;
          var dealerInnerText   = dealersName[i].innerHTML;
          var dealerRep         = dealersName[i].getAttribute("data-dname");
          var dealerState       = dealersName[i].getAttribute("data-dstate");
  
          if ( state == dealerState ) {
            var childNode = '<option value="' + dealerValue + '" data-dname="' + dealerRep + '">' + dealerInnerText + '</option>';
            dealerExist = true;
  
            mainDealer.innerHTML += childNode;
          }// if
  
        }// for
  
        if ( !dealerExist ) {
            mainDealer.innerHTML += '<option value="EquipmentDepot" data-dstate="" data-dname="David Turner">EquipmentDepot</option>';
        }// if

      });

      // Main Dealer Name Field
      var mainDealerSelectElem = document.querySelector('.main-dealer-field');

      mainDealerSelectElem.addEventListener('change', function() {

        var optionIndex = mainDealerSelectElem.selectedIndex;
        var optionElem  = mainDealerSelectElem.options[optionIndex];

        // console.log('options ', optionElem );

        var dealerRepName   = optionElem.getAttribute('data-dname');
  
        if ( dealerRepName ) {
          // Sales Rep Name
          document.getElementById('00N3l00000FRBrp').value = dealerRepName;
          // console.log(dealerRepName);
        } else {
            document.getElementById('00N3l00000FRBrp').value = '';
        }// if / else

      });


    });
  
  })(jQuery);
