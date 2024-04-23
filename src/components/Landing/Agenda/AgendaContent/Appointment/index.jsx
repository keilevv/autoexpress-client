import { useEffect, useState } from "react";
/* Components */
import { Form, TimePicker, Calendar, theme, Row } from "antd";
/* Helpers */
import dayjs from "dayjs";
import moment from "moment";
/* Hooks*/
import useAppointment from "../../../../../hooks/useAppointment";
import "./style.css";
/**
 * @param {{
 *  setForm: () => void,
 *  setIsChanged?: () => void,
 *  isEditing?: boolean,
 *  appointment?: any,
 *  isAppointmentDetails?: boolean
 * }} props
 */
function AppointmentForm({
  setForm,
  setIsChanged,
  isAppointmentDetails,
  isEditing = true,
  appointment,
}) {
  const [dateValue, setDateValue] = useState(dayjs());
  const [hourValue, setHourValue] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const { getUnavailableTimesOfDay, unavailableTimes } = useAppointment();
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const wrapperStyle = {
    maxWidth: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  useEffect(() => {
    setForm(form), [form];
  }, [form]);

  useEffect(() => {
    getUnavailableTimesOfDay(dayjs().format("DD/MM/YYYY"));
    form.setFieldsValue({
      date: dayjs().format("DD/MM/YYYY"),
    });
  }, []);

  const disabledDate = (current) => {
    // Disable dates before the current day
    const isBeforeToday = current && current < moment().startOf("day");

    // Disable dates after 1 month from today
    const isAfterOneMonth =
      current && current > moment().add(1, "month").startOf("day");
    const isToday = current.isSame(moment(), "day");
    const isAfterWorkHours = current && current.hour() > 17;
    const isSunday = current && current.day() === 0;

    return (
      isBeforeToday ||
      isAfterOneMonth ||
      isSunday ||
      !isEditing ||
      (isToday && isAfterWorkHours)
    );
  };

  function handlePrefill() {
    if (appointment) {
      setDateValue(dayjs(appointment.date, "DD/MM/YYYY"));
      setHourValue(dayjs(appointment.time, "HH:mm"));
      form.setFieldsValue({
        date: dayjs(appointment.date, "DD/MM/YYYY"),
        time: dayjs(appointment.time, "HH:mm"),
      });
    }
  }

  useEffect(() => {
    handlePrefill();
  }, [appointment, isEditing]);

  const disabledTime = (current) => {
    const disabledMinutes = [];
    const currentHour = moment().hour();

    // Create an array of hours including all hours before the current hour
    let disabledHours = [];
    if (form.getFieldValue("date").length) {
      if (form.getFieldValue("date") === dayjs().format("DD/MM/YYYY")) {
        for (let i = 0; i < currentHour; i++) {
          disabledHours.push(i);
        }
      }
    }

    // Add the specific hours you want to disable
    const additionalDisabledHours = [
      0, 1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23,
    ];

    // Combine both arrays to get the final array of disabled hours
    const allDisabledHours = [...disabledHours, ...additionalDisabledHours];

    if (unavailableTimes.length) {
      unavailableTimes.forEach((unavailableTime) => {
        if (selectedHour === unavailableTime.split(":")[0]) {
          disabledMinutes.push(Number(unavailableTime.split(":")[1]));
        }
      });
    }
    return {
      disabledHours: () => allDisabledHours,
      disabledMinutes: () => disabledMinutes,
    };
  };

  return (
    <Form
      onFieldsChange={() => {
        setIsChanged && setIsChanged(true);
      }}
      form={form}
      layout="vertical"
      name="car"
      labelCol={{
        span: 30,
      }}
      style={{
        maxWidth: 700,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <div className="appointment-form-container">
        <p className="appointment-info-title">
          {isAppointmentDetails
            ? "Información de la cita"
            : "Ingrese la fecha deseada"}
        </p>
        <div className="appointment-fields-container">
          <Row>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una fecha",
                },
              ]}
            >
              <div style={wrapperStyle}>
                <Calendar
                  value={dateValue}
                  onSelect={(date) => {
                    getUnavailableTimesOfDay(dayjs(date).format("DD/MM/YYYY"));
                    form.setFieldValue(
                      "date",
                      dayjs(date).format("DD/MM/YYYY")
                    );
                    setDateValue(dayjs(date));
                    setIsChanged(true);
                  }}
                  fullscreen={false}
                  disabledDate={(current) => {
                    return disabledDate(current);
                  }}
                />
              </div>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Hora"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una hora",
                },
              ]}
            >
              <TimePicker
                disabled={!isEditing}
                value={hourValue}
                onChange={(value) => {
                  setHourValue(value);
                }}
                inputReadOnly
                showNow={false}
                placeholder="Seleccionar hora"
                size="large"
                format={"HH:mm"}
                minuteStep={20}
                disabledTime={disabledTime}
                onSelect={(value) => {
                  setSelectedHour(dayjs(value).format("HH"));
                }}
              />
            </Form.Item>
          </Row>
        </div>
      </div>
    </Form>
  );
}
export default AppointmentForm;
