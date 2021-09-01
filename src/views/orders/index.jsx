
import React, { Fragment, useCallback, useState } from "react";
import { Container, Table ,Modal ,Button, InputGroup, FormControl} from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch,useSelector } from "react-redux";
import { addMeal, deleteMeal } from "../../store/action/order";

const schema = yup.object().shape({
    mealName:yup.string().required("Name is required"),
})
export default function Order() {
    const formik = useFormik({
        initialValues: {
            mealName: '',
        },
        validationSchema:schema,
        validateOnMount:true,
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        formik.setFieldTouched("mealName",false);
    }

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const [showNameEdit, setShowNameEdit] = useState("");
    const [showAmountEdit, setShowAmountEdit] = useState("");
    const [showIndexDelete, setShowIndexDelete] = useState("");
    
    const handleShowInfoEdit = (name,amount) => {
        setShowNameEdit(name);
        setShowAmountEdit(amount);
    }
    
    

    const dispatch = useDispatch();
   
    const mealList = useSelector((state) => {
        return state.orders.mealList;
    })
    const handleDeleteMeal = useCallback(() => {
        const mealListClone = [...mealList];
        mealListClone.splice(showIndexDelete,1);
        dispatch(deleteMeal(mealListClone,()=>handleCloseDelete()));

    },[mealList,dispatch,showIndexDelete])
    
    const handleAddMeal = useCallback(() =>{
       
        formik.setFieldTouched("mealName");
        if(!formik.values.mealName) return;
       
        dispatch(addMeal(formik.values.mealName,() => formik.resetForm()));
    },[dispatch,formik])
    
    

  return (
    <Fragment>
      <Container style={{ maxWidth: 700, padding: 50 }}>

        {/* Add modal */}
        <div className="mb-3" style={{textAlign:"right"}}>
          <Button variant="primary" onClick={handleShow}>
            Add new
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <label htmlFor="">Input the meat name will count</label>
            <InputGroup className="mb-1 mt-2">
                
                <FormControl
                name="mealName"
                value={formik.values.mealName}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </InputGroup>
             {formik.touched.mealName && <span className="text-danger">{formik.errors.mealName}</span>}  
               
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="primary" onClick={handleAddMeal}>
                 Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Edit modal */}
        <div className="mb-3" >
          

          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit meal</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            
            <InputGroup className="mb-1 mt-2">
                
                <FormControl
                readOnly
                value={showNameEdit}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
               
                />
            </InputGroup>
            <label htmlFor="">The count is {showAmountEdit}</label>
               
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="primary" onClick={handleCloseEdit}>
                 Edit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Delete modal */}
        <div className="mb-3" >
          

          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete meal</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            
           
            <p htmlFor="">Are you want to delete "{showNameEdit}" with the count is {showAmountEdit}</p>
               
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="primary" onClick={handleDeleteMeal}>
                 Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Table striped bordered hover style={{textAlign:"center"}}>
          <thead>
            <tr>
              <th>No</th>
              <th>Meal</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mealList.map((item,key)=>{
                return (
                    <tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td><span onClick={() => {
                            handleShowEdit();
                            handleShowInfoEdit(item.name,item.amount);
                        }} style={{cursor:"pointer"}}>Edit</span> | <span onClick={() => {
                            handleShowDelete();
                            handleShowInfoEdit(item.name,item.amount);
                            setShowIndexDelete(key);
                        }}  style={{cursor:"pointer"}}>Delete</span></td>
                    </tr>
                )
            })}
           
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
}
