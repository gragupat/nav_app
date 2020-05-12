import mongoose from 'mongoose';
import navSchema from '../schemas/nav.schema';

const Nav = mongoose.model('Nav', navSchema);

export default Nav;