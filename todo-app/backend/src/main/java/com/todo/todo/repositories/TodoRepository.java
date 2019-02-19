package com.todo.todo.repositories;

import com.todo.todo.models.Todo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TodoRepository extends CrudRepository<Todo, Integer> {
    List<Todo> getTodosByUserid(Integer userid);
    Todo findTodoById(Integer id);

    List<Todo> getTodosByUseridOrderByDoneAscCreatedAsc(Integer userid);
}
