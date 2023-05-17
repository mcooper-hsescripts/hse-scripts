// This script controls how different parts of a form are shown or hidden based on user interaction
// v2.1

window.onload = function() {
    // Fetching dropdowns and checkboxes from the form
    var dropdown = document.getElementById('Consultation-Outcome');
    var checkboxHouseBuying = document.getElementById('Recommended-Sale-Method_House-Buying-Company');
    var checkboxTraditionalAuction = document.getElementById('Recommended-Sale-Method_Traditional-Auction');
    var checkboxModernAuction = document.getElementById('Recommended-Sale-Method_Modern-Auction');

    // Fetching the div elements that will be shown or hidden
    var divClosedLost = document.getElementsByClassName('conditional_consultation-outcome_closed-lost')[0];
    var divReferPartner = document.getElementsByClassName('conditional_consultation-outcome_refer-to-partner')[0];
    var divHouseBuying = document.getElementsByClassName('conditional_recommended-sale-method_house-buying-company')[0];
    var divTraditionalAuction = document.getElementsByClassName('conditional_recommended-sale-method_traditional-auction')[0];
    var divModernAuction = document.getElementsByClassName('conditional_recommended-sale-method_modern-auction')[0];

    // Function to hide all divs
    var hideAllDivs = function() {
        divClosedLost.style.display = 'none';
        divReferPartner.style.display = 'none';
        divHouseBuying.style.display = 'none';
        divTraditionalAuction.style.display = 'none';
        divModernAuction.style.display = 'none';
    };

    // Initially, all divs are hidden
    hideAllDivs();

    // Event listener on dropdown selection
    dropdown.addEventListener('change', function() {
        // Before showing the right div, all divs are hidden
        hideAllDivs();

        // The div to show is determined by the selected dropdown option
        if (dropdown.value === 'Closed (Lost)') {
            divClosedLost.style.display = 'block';
        } else if (dropdown.value === 'Refer to Partner') {
            divReferPartner.style.display = 'block';
        }
    });

    // Event listeners on checkboxes
    checkboxHouseBuying.addEventListener('change', function() {
        divHouseBuying.style.display = checkboxHouseBuying.checked ? 'block' : 'none';
    });

    checkboxTraditionalAuction.addEventListener('change', function() {
        divTraditionalAuction.style.display = checkboxTraditionalAuction.checked ? 'block' : 'none';
    });

    checkboxModernAuction.addEventListener('change', function() {
        divModernAuction.style.display = checkboxModernAuction.checked ? 'block' : 'none';
    });

    // Checkbox ID to Div Class mapping
    var checkboxDivMapping = {
        // mapping format: 'Checkbox ID': 'Div Class Name'
        'House-Buying-Company_House-Buyer-Bureau': 'conditional_house-buying-comment_house-buyer-bureau',

        'Traditional-Auction_Auction-House-London': 'conditional_traditional-auction-comment_auction-house-london',
        'Traditional-Auction_Auction-House-Manchester': 'conditional_traditional-auction-comment_auction-house-manchester',
        'Traditional-Auction_Auction-House-West-Yorkshire': 'conditional_traditional-auction-comment_auction-house-west-yorkshire',
        'Traditional-Auction_Hollis-Morgan': 'conditional_traditional-auction-comment_hollis-morgan',
        'Traditional-Auction_Martin-Bond': 'conditional_traditional-auction-comment_martin-bond',
        'Traditional-Auction_Pattinsons': 'conditional_traditional-auction-comment_pattinsons',
        'Traditional-Auction_Savills': 'conditional_traditional-auction-comment_savills',
        'Traditional-Auction_SDL-Auctions': 'conditional_traditional-auction-comment_sdl-auctions',

        'Modern-Auction_Martin-Bond': 'conditional_modern-auction-comment_martin-bond',
        'Modern-Auction_Pattinsons': 'conditional_modern-auction-comment_pattinsons',
        'Modern-Auction_SDL-Auctions': 'conditional_modern-auction-comment_sdl-auctions',
    };

    // Function to set up the event listener
    var setupCheckboxListener = function(checkboxId, divClassName) {
        var checkbox = document.getElementById(checkboxId);
        var div = document.getElementsByClassName(divClassName)[0];

        // Initially, the div is hidden
        div.style.display = 'none';

        // Event listener for checkbox state change
        checkbox.addEventListener('change', function() {
            // Show or hide the div based on the checkbox state
            div.style.display = this.checked ? 'block' : 'none';
        });
    };

    // Set up event listeners for all checkboxes based on the mapping
    for (var checkboxId in checkboxDivMapping) {
        setupCheckboxListener(checkboxId, checkboxDivMapping[checkboxId]);
    }

    // Fetching URL parameters
    var urlParams = new URLSearchParams(window.location.search);

    // Check if name parameter is present and not empty
    if(urlParams.has('name') && urlParams.get('name')) {
        var divName = document.getElementsByClassName('parameter-display_name')[0];
        divName.innerText = urlParams.get('name'); // set the text of divName to the 'name' URL parameter
    }

    // Check if address parameter is present and not empty
    if(urlParams.has('address') && urlParams.get('address')) {
        var divAddress = document.getElementsByClassName('parameter-display_address')[0];
        divAddress.innerText = urlParams.get('address'); // set the text of divAddress to the 'address' URL parameter
    }

    // Fetching form
    var form = document.getElementById('wf-form-Ultimate-Quiz-HSE-Consultation-Outcome');

    // Parameters to add as hidden fields
    var hiddenFieldParams = ['contactId', 'dealId'];

    // Function to create and append a hidden input to the form
    var addHiddenField = function(param) {
        if(urlParams.has(param) && urlParams.get(param)) {
            var hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = param;
            hiddenInput.value = urlParams.get(param);

            form.appendChild(hiddenInput); // add the hidden field to the form
        }
    }

    // Loop over the hiddenFieldParams array and call addHiddenField for each parameter
    setTimeout(function() {
        hiddenFieldParams.forEach(addHiddenField);
    }, 1000); // wait 1 second before adding the hidden fields

};

// Function to display the checked checkboxes and add hidden fields to record them
function displayCheckedCheckboxes() {
    var form = document.getElementById('wf-form-Ultimate-Quiz-HSE-Consultation-Outcome');

    // Fetching the div to display the checkbox names
    var divConfirm = document.getElementsByClassName('conditional_confirmation_referrals-to-make')[0];

    // Fetch all checkboxes from the form
    var checkboxes = form.querySelectorAll('input[type=checkbox]');

    // Initialize arrays to store the names of checked checkboxes, recommended sale methods, and referred partners
    var checkedNames = [];
    var recommendedWaysToSell = [];
    var referredPartners = [];

    // Loop over all checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        // If the checkbox is checked and its id doesn't start with "Recommended-Sale-Method",
        // add its name to the array
        if (checkboxes[i].checked && !checkboxes[i].id.startsWith('Recommended-Sale-Method')) {
            var checkboxName = checkboxes[i].dataset.name;
            checkedNames.push(checkboxName);

            // Split the name into type and company
            var splitName = checkboxName.split(' > ');
            var type = splitName[0];
            var company = splitName[1];

            // Add the type and company to their respective arrays if they are not already included
            if (!recommendedWaysToSell.includes(type)) {
                recommendedWaysToSell.push(type);
            }
            if (!referredPartners.includes(company)) {
                referredPartners.push(company);
            }
        }
    }

    // Initialize an empty string to build the list
    var listString = '';

    // Initialize an empty string to build the referrals
    var referrals = '';

    // Loop over the checkedNames array and add each name to the list string and referrals string
    for (var i = 0; i < checkedNames.length; i++) {
        listString += '<li>' + checkedNames[i] + '</li>'; // adding each name to the list

        // Split the name into type and company
        var splitName = checkedNames[i].split(' > ');
        var type = splitName[0];
        var company = splitName[1];

        // Add the referral to the string
        referrals += type + ': ' + company;

        // If this is not the last referral, add a comma and a space
        if (i < checkedNames.length - 1) {
            referrals += ', '; // adding comma for separation
        }
    }

    // Wrap the list string in <ol> tags to make it a numbered list
    listString = '<ol>' + listString + '</ol>'; // preparing ordered list

    // Display the list in the div
    divConfirm.innerHTML = listString; // displaying the list in div

    // Check if there is already a referral input
    var existingReferralInput = form.querySelector('input[name="Referrals To Make"]');
    // If there is, remove it
    if (existingReferralInput) {
        form.removeChild(existingReferralInput); // removing existing referral input if exists
    }

    // Create a new hidden input element for the referrals
    var referralInput = document.createElement('input');
    referralInput.type = 'hidden';
    referralInput.name = 'Referrals To Make';
    referralInput.value = referrals;

    // Append the referral input to the form
    form.appendChild(referralInput); // adding the new referral input to the form

    // Check if there are already hidden inputs for "Recommended Way to Sell (Consultation)" and "Referred Partners"
    var existingRecommendedWayToSellInput = form.querySelector('input[name="Recommended Way to Sell (Consultation)"]');
    var existingReferredPartnersInput = form.querySelector('input[name="Referred Partners"]');

    // If they exist, remove them
    if (existingRecommendedWayToSellInput) {
        form.removeChild(existingRecommendedWayToSellInput); // removing existing input if exists
    }
    if (existingReferredPartnersInput) {
        form.removeChild(existingReferredPartnersInput); // removing existing input if exists
    }

    // Create a new hidden input element for "Recommended Way to Sell (Consultation)"
    var recommendedWayToSellInput = document.createElement('input');
    recommendedWayToSellInput.type = 'hidden';
    recommendedWayToSellInput.name = 'Recommended Way to Sell (Consultation)';
    recommendedWayToSellInput.value = recommendedWaysToSell.join(', ');

    // Append the "Recommended Way to Sell (Consultation)" input to the form
    form.appendChild(recommendedWayToSellInput); // adding the new input to the form

    // Create a new hidden input element for "Referred Partners"
    var referredPartnersInput = document.createElement('input');
    referredPartnersInput.type = 'hidden';
    referredPartnersInput.name = 'Referred Partners';
    referredPartnersInput.value = referredPartners.join(', ');

    // Append the "Referred Partners" input to the form
    form.appendChild(referredPartnersInput); // adding the new input to the form
    
    // Array of ways to sell
var waysToSell = ['House-Buying Company', 'Traditional Auction', 'Modern Auction'];

    //Now add "Partner Stage" field for each of the 3 sale methods. 
    // For each way to sell
    waysToSell.forEach(function(wayToSell) {
    // Construct the field name by concatenating the strings. For example, for "House-Buying Company", the field name will be "Partner Stage (House-Buying Company)"
    var fieldName = 'Partner Stage (' + wayToSell + ')';
    
    // If the way to sell is included in the recommendedWaysToSell array, set the field value to "Referred to partner", otherwise set it to "n/a"
    var fieldValue = recommendedWaysToSell.includes(wayToSell) ? 'Referred to partner' : 'n/a';
    
    // Create a new hidden input element
    var hiddenInput = document.createElement('input');
    
    // Set the type of the input to "hidden"
    hiddenInput.type = 'hidden';
    
    // Set the name of the input to the field name
    hiddenInput.name = fieldName;
    
    // Set the value of the input to the field value
    hiddenInput.value = fieldValue;

    // Append the hidden input to the form
    form.appendChild(hiddenInput);
});

}

// Add event listener to the button that opens the confirmation popup
document.getElementById('openConfirmationPopup').addEventListener('click', displayCheckedCheckboxes); 
// This event listener listens for a click event on the 'openConfirmationPopup' button. When clicked, it calls the 'displayCheckedCheckboxes' function which processes and displays the checked checkboxes.
