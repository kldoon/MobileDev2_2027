import * as Yup from 'yup';

const rideRequestSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least two letters!')
    .max(20)
    .required(),
  destination: Yup.string()
    .trim()
    .min(3)
    .required('You must enter your destiantion!'),
  location: Yup.string()
    .trim()
    .oneOf(['Hebron', 'Dura', 'Halhul', 'Yatta'])
    .optional(),
  passengers: Yup.number().integer().positive().min(1).max(7).required(),
});

export default rideRequestSchema;
