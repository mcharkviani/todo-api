const Task = require('../models/Task');
const User = require('../models/User');

exports.getTasks = async (req, res, next) => {
    await Task.find({user: req.user.id})
    .then(result => {
        let isCompleted;
        if (req.url === '/completed') isCompleted = true;
        else isCompleted = false;
        const tasks = result.filter(t => t.isCompleted === isCompleted)
        res.status(200).send(tasks);
    })
    .catch(err => {
        res.json({success: false, error: err.message})
    })
}

exports.createTask = async (req, res, next) => {
    req.body.user = req.user.id;
    await Task.create(req.body)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.json({success: false, error: err.message})
    })

}

exports.updateTask = async (req, res, next) => {
    const {id} = req.params;
    const task = await Task.findById({_id: id});
    if (!task) 
        return res.status(404).json({message: "Task doesn't exist"})
    // if (task.user !== req.user.id) 
    //     return res.status(401).json({message: `No authorized to update this task`, statusCode: 401});
    else {
        await Task.findByIdAndUpdate(id, req.body, {new: true})
        .then((result) => {
            res.status(200).send({message: 'Task updated successfully', data: result});
        })
        .catch((err) => {
            res.json({success: false, error: err.message})
        });
    }
}

exports.deleteTask = async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) 
        return res.status(404).json({message: "Task doesn't exist"})
    // if (task.user !== req.user.id) 
    //     return res.status(401).json({message: `No authorized to delete this task`, statusCode: 401});
    else {
        await Task.deleteOne({_id: id})
        .then(() => {
            res.status(200).json({message: 'Task deleted successfully' });
        })
        .catch((err) => {
            res.json({success: false, error: err.message})
        });
    }
}




