import express from 'express';
import { Nav } from '../database/models';

const navController = express.Router();

navController.get('/', async (req, res) => {
    res.status(200).json({
        status: 'success'
    });
});

navController.get('/:shortLink', async (req, res) => {
    try {
        const findNav = await Nav.findOne({ shortLink: req.params.shortLink }).exec()
        if (findNav === null) {
            throw new Error('Nav link not found!')
        }
        res.redirect(findNav.fullUrl)
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
});

navController.post('/add-link', async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a shortLink and fullUrl',
        })
    }

    const newNavData = new Nav(req.body);
    if (!newNavData) {
        return res.status(400).json({ success: false, error: err })
    }

    const findNav = await Nav.findOne({ shortLink: newNavData.shortLink }).exec()
    if (findNav !== null) {
        return res.status(400).json({ success: false, error: 'Nav link already exists! update not supported yet' })
    }

    newNavData
        .save()
        .then(data => {
            return res.status(201).json({
                success: true,
                message: 'Nav link created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Nav link not created!',
            })
        })
});

export default navController;