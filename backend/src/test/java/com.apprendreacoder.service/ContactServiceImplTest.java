package com.apprendreacoder.service;

import com.apprendreacoder.model.Contact;
import com.apprendreacoder.repository.ContactRepository;
import com.apprendreacoder.service.impl.ContactServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

// Test unitaire (logique métier) du service ContactServiceImpl
public class ContactServiceImplTest {

    @Test
    void create_shouldSaveContact() throws Exception {
        ContactRepository repo = mock(ContactRepository.class);
        ContactService service = new ContactServiceImpl(repo);

        Contact c = new Contact();
        c.setNom("Dupond");
        c.setPrenom("Jean");
        c.setTelephone("0600000000");

        when(repo.save(any(Contact.class))).thenAnswer(inv -> {
            Contact saved = inv.getArgument(0);
            var idField = Contact.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(saved, 1L);
            return saved;
        });

        Contact created = service.create(c);

        ArgumentCaptor<Contact> captor = ArgumentCaptor.forClass(Contact.class);
        verify(repo).save(captor.capture());
        assertThat(captor.getValue().getNom()).isEqualTo("Dupond");
        assertThat(created.getId()).isEqualTo(1L);
    }

    @Test
    void findAll_shouldReturnListFromRepo() {
        ContactRepository repo = mock(ContactRepository.class);
        ContactService service = new ContactServiceImpl(repo);

        when(repo.findAll()).thenReturn(List.of(new Contact(), new Contact()));
        assertThat(service.findAll()).hasSize(2);
    }

    @Test
    void findById_shouldReturnOptional() {
        ContactRepository repo = mock(ContactRepository.class);
        ContactService service = new ContactServiceImpl(repo);

        Contact c = new Contact();
        when(repo.findById(1L)).thenReturn(Optional.of(c));

        assertThat(service.findById(1L)).isPresent();
    }
}
