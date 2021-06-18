import React from "react";
import * as S from "./styles";
import { CalendarAlt as Calendar } from "@styled-icons/fa-regular/CalendarAlt";
import { HomeWork } from "@styled-icons/material-rounded/HomeWork";
import { Work } from "@styled-icons/material/Work";
import { Works } from "@model/works";
import { capitalize } from "lodash";

const ProfessionalExperience: React.FC = () => {
  function dateFormat(date?: string) {
    if (date) {
      const dateObj = new Date(date);
      const stringDate = Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
      }).format(dateObj);
      return <time dateTime={date}>{capitalize(stringDate)}</time>;
    } else {
      return <span>Até o momento</span>
    }
  }

  return (
    <S.ContentWrapper>
      <S.Title>Experiências Profissionais</S.Title>
      {Works.sort((a, b) => b.duration.init.localeCompare(a.duration.init)).map((work, index) => {
        return (
          <S.WorkWrap key={index}>
            <S.InfoWrap>
              <S.InfoName>
                <Work size={20} /> {work.job}
              </S.InfoName>
              <S.InfoLocale>
                <HomeWork size={20} /> {work.locale}
              </S.InfoLocale>
              <S.InfoDate>
                <Calendar size={20} />
                {dateFormat(work.duration.init)} -
                {dateFormat(work.duration.end)}
              </S.InfoDate>
            </S.InfoWrap>
            <S.Description>{work.description}</S.Description>
          </S.WorkWrap>
        );
      })}
    </S.ContentWrapper>
  );
};

export default ProfessionalExperience;
