import React from "react";
import * as S from "./styles";
import { CalendarAlt as Calendar } from "@styled-icons/fa-regular/CalendarAlt";
import { University } from "@styled-icons/fa-solid/University";
import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import { UserGraduate } from "@styled-icons/fa-solid/UserGraduate";
import { OndemandVideo } from "@styled-icons/material-rounded/OndemandVideo";
import { Formation, Courses } from "@model/formation";
import { capitalize } from "lodash";

const AcademicFormation: React.FC = () => {
  function dateFormat(date?: string) {
    if (date) {
      const dateObj = new Date(date);
      const stringDate = Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
      }).format(dateObj);
      return <time dateTime={date}>{capitalize(stringDate)}</time>;
    } else {
      return <span>Até o momento</span>;
    }
  }

  function numberFormat(number: number) {
    const stringNumber = Intl.NumberFormat('pt-BR').format(number);
    return <span>{stringNumber} Horas/Aulas</span>;
  }

  return (
    <>
      <S.ContentWrapper>
        <S.Title>Formação Acadêmica</S.Title>
        {Formation.sort((a, b) =>
          b.duration.init.localeCompare(a.duration.init)
        ).map((work, index) => {
          return (
            <S.FormationWrap key={index}>
              <S.InfoWrap>
                <S.InfoName>
                  <UserGraduate size={20} /> {work.name}
                </S.InfoName>
                <S.InfoLocale>
                  <University size={20} /> {work.locale}
                </S.InfoLocale>
                <S.InfoDate>
                  <Calendar size={20} />
                  {dateFormat(work.duration.init)} -
                  {dateFormat(work.duration.end)}
                </S.InfoDate>
              </S.InfoWrap>
              <S.Description>{work.description}</S.Description>
            </S.FormationWrap>
          );
        })}
      </S.ContentWrapper>

      <S.ContentWrapper>
        <S.Title>Cursos</S.Title>
        {Courses.sort((a, b) =>
          b.year.localeCompare(a.year)
        ).map((course, index) => {
          return (
            <S.CourseWrap
              key={index}
              href={course.link}
              title={course.name}
              target='_blank'
              rel='noopener noreferrer'
            >
              <S.InfoWrap>
                <S.InfoName>
                  { course.online ? <OndemandVideo size={30} /> : <GraduationCap size={30} />}
                  {course.name}
                </S.InfoName>
                <S.InfoLocale>
                  <span>{course.locale}</span> -
                  <span>Ano: <time>{course.year}</time></span>
                </S.InfoLocale>
                <S.InfoDate>
                  {numberFormat(course.duration)} { course.online ? '( Online )' : '( Presencial )'}
                </S.InfoDate>
              </S.InfoWrap>
            </S.CourseWrap>
          );
        })}
      </S.ContentWrapper>
    </>
  );
};

export default AcademicFormation;
