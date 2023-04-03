--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    doctor_id integer NOT NULL,
    done boolean DEFAULT false NOT NULL,
    schedule_id integer NOT NULL,
    confirmed boolean DEFAULT false NOT NULL
);


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: dates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dates (
    id integer NOT NULL,
    date text NOT NULL
);


--
-- Name: dates_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dates_id_seq OWNED BY public.dates.id;


--
-- Name: doctor_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctor_schedule (
    id integer NOT NULL,
    doctor_id integer NOT NULL,
    date_id integer NOT NULL,
    time_id integer NOT NULL,
    available boolean DEFAULT true NOT NULL
);


--
-- Name: doctor_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctor_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctor_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctor_schedule_id_seq OWNED BY public.doctor_schedule.id;


--
-- Name: doctor_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctor_sessions (
    id integer NOT NULL,
    doctor_id integer NOT NULL,
    token text NOT NULL
);


--
-- Name: doctors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctors (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    location text NOT NULL,
    specialty text NOT NULL,
    crm text NOT NULL
);


--
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;


--
-- Name: doctors_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctors_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctors_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctors_sessions_id_seq OWNED BY public.doctor_sessions.id;


--
-- Name: patient_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patient_sessions (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    token text NOT NULL
);


--
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text,
    phone text NOT NULL
);


--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: patients_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.patients_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: patients_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.patients_sessions_id_seq OWNED BY public.patient_sessions.id;


--
-- Name: times; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.times (
    id integer NOT NULL,
    "time" text NOT NULL
);


--
-- Name: times_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.times_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: times_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.times_id_seq OWNED BY public.times.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: dates id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dates ALTER COLUMN id SET DEFAULT nextval('public.dates_id_seq'::regclass);


--
-- Name: doctor_schedule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_schedule ALTER COLUMN id SET DEFAULT nextval('public.doctor_schedule_id_seq'::regclass);


--
-- Name: doctor_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_sessions ALTER COLUMN id SET DEFAULT nextval('public.doctors_sessions_id_seq'::regclass);


--
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- Name: patient_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient_sessions ALTER COLUMN id SET DEFAULT nextval('public.patients_sessions_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Name: times id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.times ALTER COLUMN id SET DEFAULT nextval('public.times_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.appointments VALUES (2, 3, 1, false, 2, false);
INSERT INTO public.appointments VALUES (6, 3, 1, false, 3, false);
INSERT INTO public.appointments VALUES (5, 3, 2, true, 7, true);
INSERT INTO public.appointments VALUES (7, 3, 2, true, 4, true);
INSERT INTO public.appointments VALUES (1, 3, 2, true, 6, true);
INSERT INTO public.appointments VALUES (8, 3, 2, true, 5, true);


--
-- Data for Name: dates; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.dates VALUES (1, 'Segunda-feira');
INSERT INTO public.dates VALUES (2, 'Terça-feira');
INSERT INTO public.dates VALUES (3, 'Quarta-feira');
INSERT INTO public.dates VALUES (4, 'Quinta-feira');
INSERT INTO public.dates VALUES (5, 'Sexta-feira');


--
-- Data for Name: doctor_schedule; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctor_schedule VALUES (7, 2, 2, 3, true);
INSERT INTO public.doctor_schedule VALUES (1, 1, 1, 1, true);
INSERT INTO public.doctor_schedule VALUES (6, 2, 2, 2, true);
INSERT INTO public.doctor_schedule VALUES (2, 1, 1, 2, false);
INSERT INTO public.doctor_schedule VALUES (3, 1, 2, 2, false);
INSERT INTO public.doctor_schedule VALUES (4, 2, 1, 1, false);
INSERT INTO public.doctor_schedule VALUES (5, 2, 2, 1, false);


--
-- Data for Name: doctor_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctor_sessions VALUES (1, 1, '6b3ec84f-db0f-4103-b385-0b271acaaf6a');
INSERT INTO public.doctor_sessions VALUES (2, 2, '6406f688-1fe4-4dc1-bc30-99710fbeacde');


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctors VALUES (1, 'danniel', 'danniel2@gmail.com', '$2b$10$0MVTFJTMNFUr3Xz5F0NlteRLv2wg4lCKmKTn3sWSzTrKnpabcF9PK', 'ioajsheoa', 'pediatra', '14535');
INSERT INTO public.doctors VALUES (2, 'evelyn', 'evelyn@gmail.com', '$2b$10$IqnSe4tAckKIkydmNUQK/ujRS0GyAJK5Xlmf6Y90q8d.AhM2lVhBe', 'ioajsheoa', 'pediatra', '14535');


--
-- Data for Name: patient_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patient_sessions VALUES (1, 3, 'cbd38614-9758-41ac-b820-d19b1dc6a329');
INSERT INTO public.patient_sessions VALUES (2, 3, 'a8845ebd-cc62-4450-beca-f0a94e3edb8e');
INSERT INTO public.patient_sessions VALUES (3, 3, 'b8b57c39-55ec-4579-8433-5bab9d1d02bd');
INSERT INTO public.patient_sessions VALUES (4, 3, 'f541ec49-3887-4c42-b2a3-4390a593f889');
INSERT INTO public.patient_sessions VALUES (5, 3, '0a7da87c-4098-45bb-b9a5-34d922977f08');
INSERT INTO public.patient_sessions VALUES (6, 3, '309c2a28-c2ca-480d-aa04-d367edfe4c8b');


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patients VALUES (1, 'danniel', 'danniel@gmail.com', '$2b$10$iTrNuk1jbRkOsa2qfHzFGuKiTzFLnGVIu6qC2a619fomY5xVR8IAm', '9198443438');
INSERT INTO public.patients VALUES (3, 'evelyn', 'evelyn@gmail.com', '$2b$10$KHO82lANiREfoMkOu4v1KeUxoPGTMcO0r1oDgXYathwedJea/84O2', '9198443439');


--
-- Data for Name: times; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.times VALUES (1, '10:00');
INSERT INTO public.times VALUES (2, '11:00');
INSERT INTO public.times VALUES (3, '12:00');
INSERT INTO public.times VALUES (4, '1300');
INSERT INTO public.times VALUES (5, '14:00');


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 8, true);


--
-- Name: dates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dates_id_seq', 5, true);


--
-- Name: doctor_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctor_schedule_id_seq', 7, true);


--
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctors_id_seq', 2, true);


--
-- Name: doctors_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctors_sessions_id_seq', 2, true);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patients_id_seq', 3, true);


--
-- Name: patients_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patients_sessions_id_seq', 6, true);


--
-- Name: times_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.times_id_seq', 5, true);


--
-- Name: appointments appointments_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pk PRIMARY KEY (id);


--
-- Name: dates dates_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dates
    ADD CONSTRAINT dates_pk PRIMARY KEY (id);


--
-- Name: doctor_schedule doctor_schedule_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_schedule
    ADD CONSTRAINT doctor_schedule_pk PRIMARY KEY (id);


--
-- Name: doctors doctors_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_email_key UNIQUE (email);


--
-- Name: doctors doctors_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pk PRIMARY KEY (id);


--
-- Name: doctor_sessions doctors_sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_sessions
    ADD CONSTRAINT doctors_sessions_pk PRIMARY KEY (id);


--
-- Name: patients patients_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);


--
-- Name: patients patients_phone_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_phone_key UNIQUE (phone);


--
-- Name: patients patients_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pk PRIMARY KEY (id);


--
-- Name: patient_sessions patients_sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient_sessions
    ADD CONSTRAINT patients_sessions_pk PRIMARY KEY (id);


--
-- Name: times times_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.times
    ADD CONSTRAINT times_pk PRIMARY KEY (id);


--
-- Name: appointments appointments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk0 FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: appointments appointments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_fk1 FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- Name: doctor_schedule doctor_schedule_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_schedule
    ADD CONSTRAINT doctor_schedule_fk0 FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- Name: doctor_schedule doctor_schedule_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_schedule
    ADD CONSTRAINT doctor_schedule_fk1 FOREIGN KEY (date_id) REFERENCES public.dates(id);


--
-- Name: doctor_schedule doctor_schedule_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_schedule
    ADD CONSTRAINT doctor_schedule_fk2 FOREIGN KEY (time_id) REFERENCES public.times(id);


--
-- Name: doctor_sessions doctors_sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor_sessions
    ADD CONSTRAINT doctors_sessions_fk0 FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- Name: patient_sessions patients_sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient_sessions
    ADD CONSTRAINT patients_sessions_fk0 FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- PostgreSQL database dump complete
--

