import React, { useEffect, useState } from 'react'
import {TextField, Typography,Stepper, Button, Step, StepLabel} from '@mui/material'
import {useForm, FormProvider, useFormContext, Controller } from 'react-hook-form'
import axios from 'axios'


const getSteps =()=>{
  return [
    "Basic Information",
    "Contact Information",
    "Personal Information",
    "Payment"
  ];
}

const BasicInformation = ()=>{
  const {control} = useFormContext();
  return(
    <> 
        <Controller 
        control={control} 
        name="firstName"
        render={({field})=>(
           <TextField
           id="first-name"
           label="First Name"
           variant="outlined"
           placeholder="Enter Your First Name"
           fullWidth
           margin="normal"
           {...field}
           />
        )}/>
        
        <Controller 
        control={control} 
        name="lastName"
        render={({field})=>(
          <TextField
          id="last-name"
          label="Last Name"
          variant="outlined"
          placeholder="Enter Your Last Name"
          fullWidth
          margin="normal"
          {...field}
          />
        )}/>
        
        <Controller 
        control={control} 
        name="nickName"
        render={({field})=>(
          <TextField
        id="nick-name"
        label="Nick Name"
        variant="outlined"
        placeholder="Enter Your Nick Name"
        fullWidth
        margin="normal"
        {...field}
        />
        )}/>
        
        </>
  )
}

const ContactInformation = ()=>{
  const {control} = useFormContext();
  return(
    <>
          <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="alternatePhone"
        render={({ field }) => (
          <TextField
            id="alternate-phone"
            label="Alternate Phone"
            variant="outlined"
            placeholder="Enter Your Alternate Phone"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
        </>
  )
}

const PersonalInformation = ()=>{
  const {control} = useFormContext();
  return(
    <>
      <Controller
        control={control}
        name="address1"
        render={({ field }) => (
          <TextField
            id="address1"
            label="Address 1"
            variant="outlined"
            placeholder="Enter Your Address 1"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="address2"
        render={({ field }) => (
          <TextField
            id="address2"
            label="Address 2"
            variant="outlined"
            placeholder="Enter Your Address 2"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <TextField
            id="country"
            label="Country"
            variant="outlined"
            placeholder="Enter Your Country Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
 </>
  )
}

const PaymentInformation = ()=>{
  const {control} = useFormContext();
  return(
    <>
              <Controller
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <TextField
            id="cardNumber"
            label="Card Number"
            variant="outlined"
            placeholder="Enter Your Card Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cardMonth"
        render={({ field }) => (
          <TextField
            id="cardMonth"
            label="Card Month"
            variant="outlined"
            placeholder="Enter Your Card Month"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cardYear"
        render={({ field }) => (
          <TextField
            id="cardYear"
            label="Card Year"
            variant="outlined"
            placeholder="Enter Your Card Year"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
            </>
  )
}

const getStepContent =(step)=>{
  switch(step){
    case 0:
      return <BasicInformation />
    case 1: 
      return <ContactInformation />
    case 2:
      return <PersonalInformation />
    case 3:
      return <PaymentInformation /> 
    default:
      return "unknown step"    
     
  }
}

const LinearStepper = () => {

  const [activeStep, setActiveStep] = useState(0) 

  const steps = getSteps();
  const methods = useForm({
    defaultValues:{
      firstName: "",
      lastName: "",
      nickName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhone: "",
      address1: "",
      address2: "",
      country: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",

    }
  });


  const [userData, setUserData]=useState([])
  const fetchAllDetails = async () => {
    const res = await axios.get("http://localhost:8000/data");
    console.log("fetched all new data",res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchAllDetails();
  }, []);

  
  const handleNext = async (data) => {
    if (activeStep === steps.length - 1) {   //if last step is active then only submit the data
          
          const res = await axios.post(`http://localhost:8000/data`, data);
          console.log("userData",userData);
          console.log("res",res);
          console.log("submitted data", data);
          fetchAllDetails();
          setActiveStep(activeStep + 1);     
    } else {                            //else only move to the next step
      setActiveStep(activeStep + 1);
    }
  };


  

  const handleBack =()=>{
    setActiveStep(activeStep - 1);
  };

  //const onSubmit = (data)=>{
    //console.log(data);
    //}

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {
          steps.map((steps, index)=>{
            return(
              <Step key={index}>
              <StepLabel>{steps}</StepLabel>
             </Step>
            )
          })
        }  
      </Stepper>

{
  activeStep === steps.length ? (
    <>
    <br/>
    <Typography variant='h3' align='center'>Thank You 
    </Typography><br /> 
    <Typography align='center'>Your response has been submitted <br /> 
    </Typography>
    </>
  ) : (
  <>
   <FormProvider {...methods}>
   <form onSubmit={methods.handleSubmit((data) =>handleNext(data))}>{getStepContent(activeStep)}
    <Button 
      variant="contained" 
      disabled={activeStep===0} 
      onClick = {handleBack}> 
      Back 
      </Button> {' '}

      <Button 
      variant="contained"  
      // onClick = {handleNext}
      type='submit'
      > 
      {activeStep === steps.length-1 ? "Submit" : "Next"}
      </Button>
    </form>
   </FormProvider>
   
     

  </>
  )
}

     

    </div>
  )
}

export default LinearStepper