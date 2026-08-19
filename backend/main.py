from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
from database import Base, engine,SessionLocal
import model
from schema import TaskCreate,TaskUpdate

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post('/tasks')
def create_task(task:TaskCreate,db:Session=Depends(get_db)):
    new_task=model.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        status=task.status,
        deadline=task.deadline
    )
    db.add(new_task)  
    db.commit()
    db.refresh(new_task)
    return new_task



# to get all tasks
@app.get("/tasks")
def get_tasks(db:Session=Depends(get_db)):
    tasks=db.query(model.Task).all()
    return tasks

# to get specific task
@app.get('/tasks/{task_id}')
def get_task(task_id:int,db:Session=Depends(get_db)):
    task=db.query(model.Task).filter(model.Task.id==task_id).first()
    if not task:
        raise HTTPException(
            status_code=404,
            detail="'task not found"
        )
    return task

# update operations here
@app.put('/tasks/{task_id}')
def update_task(
    task_id:int,
    task:TaskUpdate,
    db:Session=Depends(get_db)
):
    existing_task=(
        db.query(model.Task).filter(model.Task.id==task_id).first()
    )
    if not existing_task:
        return{'message':'task not found'}
    if task.title is not None:
        existing_task.title=task.title
    if task.description is not None:
        existing_task.description=task.description
    if task.priority is not None:
        existing_task.priority=task.priority
    if task.status is not None:
         existing_task.status=task.status
    if task.deadline is not None:
        existing_task.deadline=task.deadline     
    db.commit()
    db.refresh(existing_task)

    return existing_task    

@app.delete('/tasks/{task_id}')
def delete_task(task_id:int,db:Session=Depends(get_db)):
    task = db.query(model.Task).filter(model.Task.id == task_id).first()

    if not task:
        return{'message:':"task not found"}
    db.delete(task)
    db.commit()
    db.refresh()
    return {'message':'task deleted '}
