import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import {
  Container,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { userValidation } from "../../validations/userValidation";
import { userRegister } from "../../api/userApi";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      gender: "",
      education: "",
      address: "",
    },
    validationSchema: userValidation,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      setLoading(true)
      const res = await userRegister(values)
      if(res?.status === 200){
        navigate('/')
        toast.success(res?.data?.message);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  }
  return (
    <>
    {loading ? (
      <div className="fixed inset-0 flex items-center justify-center">
      <div className="spinnerouter">
        <Loading />
      </div>
    </div>
    ) : (
      <Container maxWidth="sm">
      <Box sx={{ bgcolor: "white", p: 4 }}>
        <h1 className="text-2xl font-bold ">Add User Form</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginBottom: "1rem" }}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}

          {/* Email Field */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginBottom: "1rem" }}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}

          {/* Mobile Field */}
          <TextField
            label="Mobile"
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginBottom: "1rem" }}
            {...formik.getFieldProps("mobile")}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <div style={{ color: "red" }}>{formik.errors.mobile}</div>
          )}

          {/* Gender Dropdown */}
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginBottom: "1rem" }}
          >
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" {...formik.getFieldProps("gender")}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.gender && formik.errors.gender && (
            <div style={{ color: "red" }}>{formik.errors.gender}</div>
          )}

          {/* Education Dropdown */}
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginBottom: "1rem" }}
          >
            <InputLabel>Education</InputLabel>
            <Select label="Education" {...formik.getFieldProps("education")}>
              <MenuItem value="Plus Two">Plus Two</MenuItem>
              <MenuItem value="Btech">B.Tech</MenuItem>
              <MenuItem value="Mtech">M.Tech</MenuItem>
              <MenuItem value="BCA/MCA">BCA/MCA</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.education && formik.errors.education && (
            <div style={{ color: "red" }}>{formik.errors.education}</div>
          )}

          {/* Address Field */}
          <TextField
            label="Address"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
            style={{ marginBottom: "1rem" }}
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address && (
            <div style={{ color: "red" }}>{formik.errors.address}</div>
          )}
          

          {/* Submit Button with margin-top */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "1rem"}}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
    )}
    </>
  );
};

export default Form;
