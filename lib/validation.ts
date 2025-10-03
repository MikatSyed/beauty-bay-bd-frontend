export interface ValidationErrors {
  [key: string]: string
}
export const validateFarmerStep = (step: number, formData: any): { isValid: boolean; errors: ValidationErrors } => {
  const newErrors: ValidationErrors = {}

  if (step === 1) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
  }

  if (step === 2) {
    if (!formData.firstName?.trim()) {
      newErrors.name = "Name is required"
    }
  
    if (!formData.farmName?.trim()) {
      newErrors.farmName = "Farm name is required"
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required"
    }
  }

  if (step === 3) {
    if (!formData.farmAddress?.trim()) {
      newErrors.farmAddress = "Farm address is required"
    }
    if (!formData.city?.trim()) {
      newErrors.city = "City is required"
    }
    if (!formData.state?.trim()) {
      newErrors.state = "State/Province is required"
    }
    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = "Zip/Postal code is required"
    }
    if (!formData.country) {
      newErrors.country = "Country is required"
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  }
}

export const validateBuyerStep = (step: number, formData: any): { isValid: boolean; errors: ValidationErrors } => {
  const newErrors: ValidationErrors = {}

  if (step === 1) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
  }

  if (step === 2) {
    if (!formData.name?.trim()) {
      newErrors.name = "Full name is required"
    }
    if (!formData.companyName?.trim()) {
      newErrors.companyName = "Company/Business name is required"
    }
    if (!formData.businessType?.trim()) {
      newErrors.businessType = "Business type is required"
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required"
    }
  }

  if (step === 3) {
    if (!formData.taxId?.trim()) {
      newErrors.taxId = "Tax ID / Business Registration Number is required"
    }
    if (!formData.address?.trim()) {
      newErrors.address = "Business address is required"
    }
    if (!formData.city?.trim()) {
      newErrors.city = "City is required"
    }
    if (!formData.state?.trim()) {
      newErrors.state = "State/Province is required"
    }
    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = "Zip/Postal code is required"
    }
    if (!formData.country) {
      newErrors.country = "Country is required"
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  }
}

export const validateLogisticsStep = (step: number, formData: any): { isValid: boolean; errors: ValidationErrors } => {
  const newErrors: ValidationErrors = {}

  if (step === 1) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
  }

  if (step === 2) {
    if (!formData.name?.trim()) {
      newErrors.name = "Full name is required"
    }
    if (!formData.companyName?.trim()) {
      newErrors.companyName = "Company name is required"
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required"
    }
    if (!formData.fleetSize?.trim()) {
      newErrors.fleetSize = "Fleet size is required"
    }
  }

  if (step === 3) {
    if (!formData.vehicleTypes || formData.vehicleTypes.length === 0) {
      newErrors.vehicleTypes = "Please select at least one vehicle type"
    }
    if (!formData.serviceAreas || formData.serviceAreas.length === 0) {
      newErrors.serviceAreas = "Please select at least one service area"
    }
    if (!formData.address?.trim()) {
      newErrors.address = "Business address is required"
    }
    if (!formData.city?.trim()) {
      newErrors.city = "City is required"
    }
    if (!formData.state?.trim()) {
      newErrors.state = "State/Province is required"
    }
    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = "Zip/Postal code is required"
    }
    if (!formData.country) {
      newErrors.country = "Country is required"
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  }
}
