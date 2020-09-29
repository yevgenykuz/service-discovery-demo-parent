package rabbitmqsink.model;

import javax.persistence.*;

/**
 * Product class.
 */
@Entity
@Table(name = "projects")
public class Project {
    @Id
    private Long id;

    private String name;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
