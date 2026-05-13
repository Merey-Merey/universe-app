import { ArrowRight, ChevronRight, BriefcaseBusiness, HouseHeart, CalendarHeart } from "lucide-react";
import on1 from "../assets/on-1.png";
import on2 from "../assets/on-2.png";
import on3 from "../assets/on-3.png";
import { useNavigate, useParams } from "react-router-dom";

interface PaginationDotsProps {
  total: number;
  active: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({ total, active }) => (
  <div className="pagination">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`pagination__dot ${
          i === active ? "pagination__dot--active" : "pagination__dot--inactive"
        }`}
      />
    ))}
  </div>
);

const steps = [
  {
    image: on1,
    title: "Find Your Dream Job",
    body: "Thousands of student-friendly job opportunities in one place",
    next: "/onboarding/2",
    cta: "Next",
    num: "01 / Jobs",
    icon: <BriefcaseBusiness size={23} />,
    titleEn: "Find Your Dream Job",
    descEn:
      "Thousands of student-friendly jobs near your university with flexible schedules.",
  },
  {
    image: on2,
    title: "Find Your Perfect Home",
    body: "Affordable housing options near your university",
    next: "/onboarding/3",
    cta: "Next",
    num: "02 / Housing",
    icon: <HouseHeart size={23} />,
    titleEn: "Find Your Perfect Home",
    descEn:
      "Verified apartment and room listings near campus with no middlemen.",
  },
  {
    image: on3,
    title: "Never Miss an Event",
    body: "Stay connected with campus life and opportunities",
    next: "/sign-up",
    cta: "Get Started",
    num: "03 / Events",
    icon: <CalendarHeart size={23} />,
    titleEn: "Never Miss an Event",
    descEn:
      "Career fairs, parties, lectures — everything in one event feed.",
  },
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { step } = useParams<{ step: string }>();

  const index = Math.min(
    Math.max(Number(step) - 1, 0),
    steps.length - 1
  );

  const current = steps[index];

  return (
    <>
      <div className="page-wrapper mobile-only">
        <button
          className="skip-btn"
          onClick={() => navigate("/onboarding/3")}
        >
          Skip <span style={{ fontSize: 12 }}>»»</span>
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

            <button
              className="cta-btn"
              onClick={() => navigate(current.next)}
            >
              {current.cta}
            </button>
          </div>
        </div>
      </div>
      <div className="onboarding-page desktop-only">
        <button
          className="onboarding-skip"
          onClick={() => navigate("/sign-up")}
        >
          Skip <ChevronRight size={14} />
        </button>

        <div className="onboarding-hero">
          <h1>
            Student life
            <br />
            <em>made easier</em>
          </h1>

          <p>
            The three biggest student problems — solved in one app.
          </p>
        </div>

        <div className="onboarding-cards">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`onboarding-card ${
                i === index ? "active" : ""
              }`}
              onClick={() => navigate(`/onboarding/${i + 1}`)}
            >
              <div className="onboarding-card__bar" />

              <div className="onboarding-card__num">{s.num}</div>

              <div className="onboarding-card__icon">{s.icon}</div>

              <div className="onboarding-card__title">
                {s.titleEn}
              </div>

              <div className="onboarding-card__desc">
                {s.descEn}
              </div>
            </div>
          ))}
        </div>

        <div className="onboarding-nav">
          <div className="pagination-dots">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`pagination-dot ${
                  i === index ? "active" : "inactive"
                }`}
                onClick={() => navigate(`/onboarding/${i + 1}`)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="btn-onboarding"
            onClick={() => navigate(current.next)}
          >
            {current.cta} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};