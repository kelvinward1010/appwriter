import { Avatar, Dropdown, Flex, Select, SelectProps, Typography } from "antd";
import styles from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import {
    aboutmeUrl,
    layoutUrl,
    signinUrl,
    signupUrl,
    topicsUrl,
    writecontentUrl,
} from "../../../routes/urls";
import { cutString } from "@/utils/string";
import { ButtonConfig } from "@/components/buttonconfig";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { OPTIONS_LANGUAGES } from "@/config";
import { ENIcon, VIIcon } from "@/assets/png";
import { useFollowWidth } from "@/hooks/useFollowWidth";
import { useState } from "react";
import { DrawerResponsive } from "./drawerResponsive";
import { ModalSearch } from "./modal/modalSearch";
import storage from "@/utils/storage";

const { Title, Text } = Typography;
type labelRender = SelectProps["labelRender"];

export function Header(): JSX.Element {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { isVisible, windowWidth } = useFollowWidth(768);
    const [open, setOpen] = useState<boolean>(false);
    const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);
    const [openModalLogout, setOpenModalLogout] = useState<boolean>(false);
    const isVisiableUser = true;
    const currentLanguage = localStorage.getItem("i18nextLng-kwnews");

    const goSignup = () => navigate(signupUrl);
    const goSignin = () => navigate(signinUrl);

    const goHome = () => navigate(layoutUrl);
    const goTopics = () => navigate(topicsUrl);
    const goAboutMe = () => navigate(aboutmeUrl);

    const handleChangeLanguages = (value: string) => {
        i18n.changeLanguage(value);
        i18n.reloadResources();
    };

    const handleLogout = () => {
        storage.clearToken();
        setOpenModalLogout(false);
    };

    const items = isVisiableUser
        ? [
              {
                  label: (
                      <>
                          <ButtonConfig
                              onClick={() => navigate(writecontentUrl)}
                              lable={t("head.lefthead.writecontent")}
                          />
                      </>
                  ),
                  key: "0",
              },
              {
                  label: (
                      <>
                          <ButtonConfig
                              className={"button-config"}
                              lable={t("head.lefthead.logout")}
                              onClick={handleLogout}
                          />
                      </>
                  ),
                  key: "1",
              },
          ]
        : [
              {
                  label: (
                      <>
                          <ButtonConfig
                              className={"button-config"}
                              lable={t("head.lefthead.signin")}
                              onClick={goSignin}
                          />
                      </>
                  ),
                  key: "0",
              },
              {
                  label: (
                      <>
                          <ButtonConfig
                              className={"button-config"}
                              lable={t("head.lefthead.signup")}
                              onClick={goSignup}
                          />
                      </>
                  ),
                  key: "1",
              },
          ];

    const configLableLanguages = (icon: any, lable: any) => {
        return (
            <Flex justify={"start"} align={"center"}>
                <img src={icon} alt="" style={{ width: "15px" }} />
                <Text style={{ margin: "-1px 0 0 3px" }}>{lable}</Text>
            </Flex>
        );
    };

    const lableRender: labelRender = (props) => {
        if (props.label == "VI")
            return configLableLanguages(VIIcon, props.label);
        if (props.label == "EN")
            return configLableLanguages(ENIcon, props.label);
    };

    function FormLanguages() {
        return (
            <Select
                defaultValue={currentLanguage}
                style={{ width: 100, marginRight: "10px" }}
                onChange={handleChangeLanguages}
                options={OPTIONS_LANGUAGES}
                labelRender={lableRender}
                optionRender={(options) => {
                    if (options.label == "EN") {
                        return configLableLanguages(ENIcon, "EN");
                    }
                    if (options.label == "VI") {
                        return configLableLanguages(VIIcon, "VI");
                    }
                }}
            />
        );
    }

    return (
        <div className={styles.container}>
            <Title level={3} onClick={goHome} className={styles.maintitle}>
                {t("name_app")}
            </Title>
            {isVisible ? (
                <>
                    <nav>
                        <li onClick={goHome}>
                            <Text className={`${styles.title}`} strong>
                                {t("head.menu.home")}
                            </Text>
                        </li>
                        <li onClick={goTopics}>
                            <Text className={`${styles.title}`} strong>
                                {t("head.menu.topics")}
                            </Text>
                        </li>
                        <li onClick={goAboutMe}>
                            <Text className={`${styles.title}`} strong>
                                {t("head.menu.aboutme")}
                            </Text>
                        </li>
                    </nav>
                    <div className={styles.right_head}>
                        <ModalSearch
                            setOpenModal={setOpenModalSearch}
                            openModal={openModalSearch}
                        />
                        <FormLanguages />
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={["click"]}
                        >
                            <Avatar
                                className={styles.avatar}
                                icon={<UserOutlined />}
                            >
                                {cutString("KW")}
                            </Avatar>
                        </Dropdown>
                    </div>
                </>
            ) : (
                <div className={styles.responsiveRight}>
                    <ModalSearch
                        setOpenModal={setOpenModalSearch}
                        openModal={openModalSearch}
                    />
                    <FormLanguages />
                    <DrawerResponsive
                        windowWidth={windowWidth}
                        setOpen={setOpen}
                        open={open}
                        isVisiableUser={isVisiableUser}
                        onClickLogout={handleLogout}
                        openModalLogout={openModalLogout}
                        setOpenModalLogout={setOpenModalLogout}
                    />
                </div>
            )}
        </div>
    );
}
