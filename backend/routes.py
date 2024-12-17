from flask import Blueprint, request, jsonify
from backend.extensions import db
from backend.models import Task

routes = Blueprint('routes', __name__)

@routes.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = Task(
        entity_name=data['entity_name'],
        task_type=data['task_type'],
        time=data['time'],
        contact_person=data['contact_person'],
        note=data.get('note'),
        status=data.get('status', 'open')
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created successfully'}), 201

@routes.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    result = [
        {
            'id': task.id,
            'entity_name': task.entity_name,
            'task_type': task.task_type,
            'time': task.time,
            'contact_person': task.contact_person,
            'note': task.note,
            'status': task.status,
            'date_created': task.date_created
        }
        for task in tasks
    ]
    return jsonify(result)

@routes.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404

    data = request.get_json()
    task.entity_name = data.get('entity_name', task.entity_name)
    task.task_type = data.get('task_type', task.task_type)
    task.time = data.get('time', task.time)
    task.contact_person = data.get('contact_person', task.contact_person)
    task.note = data.get('note', task.note)
    task.status = data.get('status', task.status)
    db.session.commit()

    return jsonify({'message': 'Task updated successfully'})

@routes.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})

@routes.route('/',methods=['GET'])
def home():
    return "Home"
