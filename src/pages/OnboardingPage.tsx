import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationDots } from "../components/PhoneUI";
import on1 from "../assets/on-1.png";
import on2 from "../assets/on-2.png";
import on3 from "../assets/on-3.png";

const steps = [
  {
    image: on1,
    title: "Find Your Dream Job",
    body: "Thousands of student-friendly vacancies in one place",
    next: "/onboarding/2",
    cta: "Next",
  },
  {
    image: on2,
    title: "Find Your Perfect Home",
    body: "Affordable housing options near your university",
    next: "/onboarding/3",
    cta: "Next",
  },
  {
    image: on3,
    title: "Never Miss an Event",
    body: "Stay connected with campus life and opportunities",
    next: "/sign-up",
    cta: "Get Started",
  },
];

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { step } = useParams<{ step: string }>();
  const index = Math.min(Math.max(Number(step) - 1, 0), steps.length - 1);
  const current = steps[index];

  return (
    <div className="page-wrapper">
      <button className="skip-btn" onClick={() => navigate("/onboarding/3")}>
        Skip <span style={{ fontSize: 12 }}>&#187;&#187;</span>
      </button>

      <div className="onboarding-content">
  <div className="onboarding-illustration">
    <img src={current.image} alt={current.title} />
  </div>

  <div className="text-block">
    <h2 className="text-block__title">{current.title}</h2>
    <p className="text-block__body">{current.body}</p>
  </div>

  <div className="pagination-cta">
    <PaginationDots total={steps.length} active={index} />
    <button className="cta-btn" onClick={() => navigate(current.next)}>
      {current.cta}
    </button>
  </div>
</div>
    </div>
  );
};

export default OnboardingPage;
