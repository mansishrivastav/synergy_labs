//inputs of the form
export const formInputs = [
    { id: 'name', type: 'text', label: 'Name', name:'name'},
    { id: 'email', type: 'email', label: 'Email', name:'email'},
    { id: 'phone', type: 'tel', label: 'Phone', name:'phone' },
    { id: 'username', type: 'text', label: 'Username', name:'username' },
    { id: 'address', type: 'text', label: 'Address', name:'address' },
    { id: 'company', type: 'text', label: 'Company Name', name:'companyName' },
    { id: 'website', type: 'url', label: 'Website', name:'website' }
  ];

// regex functions to validate the data
export const validateForm = (formData) => {
    const errorMessage = {};
  
    if (!formData.name || formData.name.length < 3) {
      errorMessage.name = 'Name must be at least 3 characters.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      errorMessage.email = "Please enter a valid Email id";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      errorMessage.phone = "Please enter a valid 10-digit Phone Number";
    }
    if (!formData.username || formData.username.length < 3) {
      errorMessage.username = 'Username must be at least 3 characters.';
    }
    if (!formData.address.street || !formData.address.city) {
      errorMessage.address = 'Please include both street and city in the address.';
    }
    if (!formData.company.name) {
      errorMessage.company = 'Please enter a company name.';
    }
    const websitePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!formData.website || !websitePattern.test(formData.website)) {
      errorMessage.website = "Please enter a valid Website URL";
    }
    
    return errorMessage;
  };
  