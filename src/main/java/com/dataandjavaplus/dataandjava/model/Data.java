package com.dataandjavaplus.dataandjava.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "data",schema = "public")
public class Data {

    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "data_id_seq")
    @SequenceGenerator(name = "data_id_seq", sequenceName = "data_id_seq", allocationSize = 1)
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="age")
    private int age;

    @Column(name="dogum_tarihi")
    private Date dogumTarihi;

    @Column(name="meslek")
    private String meslek;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getDogumTarihi() {
        return dogumTarihi;
    }

    public void setDogumTarihi(Date dogumTarihi) {
        this.dogumTarihi = dogumTarihi;
    }

    public String getMeslek() {
        return meslek;
    }

    public void setMeslek(String meslek) {
        this.meslek = meslek;
    }
}
