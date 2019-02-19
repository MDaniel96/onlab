package com.todo.todo.web;

import com.todo.todo.models.Todo;
import com.todo.todo.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;


    @PostMapping("/{id}")
    public @ResponseBody Todo addNewTodoToUser(@RequestBody Todo todo, @PathVariable(value = "id") Integer userid) {
        todo.setUserId(userid);
        todoRepository.save(todo);
        return todo;
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity<Object> updateTodo(@RequestBody Todo todo, @PathVariable(value = "id") Integer id) {
        Todo upd = todoRepository.findTodoById(id);
        if (upd != null) {
            todoRepository.delete(upd);
            todo.setUserId(upd.getUserId());
            todoRepository.save(todo);
            return ResponseEntity.status(HttpStatus.OK).body("Update OK");
        }
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo not found!");
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<Object> removeTodoById(@PathVariable("id") Integer id) {
        Todo del = todoRepository.findTodoById(id);
        if (del != null) {
            todoRepository.delete(del);
            return ResponseEntity.status(HttpStatus.OK).body("Delete OK");
        }
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo not found!");
    }

    @GetMapping("/{id}")
    public @ResponseBody Iterable<Todo> getTodosByUser(@PathVariable("id") Integer userid) {
        return todoRepository.getTodosByUseridOrderByDoneAscCreatedAsc(userid);
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

}
