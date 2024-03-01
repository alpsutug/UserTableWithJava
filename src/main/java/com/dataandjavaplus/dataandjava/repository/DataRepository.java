package com.dataandjavaplus.dataandjava.repository;

import com.dataandjavaplus.dataandjava.model.Data;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataRepository extends JpaRepository<Data, Long> {

}
