package com.example.converter.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
public class EmailServiceImpl {

    private final String VERIFICATION_TOPIC = "ПОДТВЕРЖДЕНИЕ ЭЛЕКТРОННОЙ ПОЧТЫ";

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String emailSender;

    public EmailServiceImpl(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendVerificationEmail(String to, String verificationLink) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

        Context context = new Context();
        context.setVariable("verificationLink", verificationLink);

        String htmlContent = templateEngine.process("email-verification", context);

        mimeMessageHelper.setFrom(emailSender);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(VERIFICATION_TOPIC);
        mimeMessageHelper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }
}
