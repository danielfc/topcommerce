package org.kalnee.topcommerce.repository;

import org.kalnee.topcommerce.domain.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select jhi_order from Order jhi_order where jhi_order.user.login = ?#{principal.username}")
    List<Order> findByUserIsCurrentUser();

    @Query("select jhi_order from Order jhi_order where jhi_order.user.login = ?#{principal.username}")
    Page<Order> findAllByUserIsCurrentUser(Pageable pageable);

    @Query("select jhi_order from Order jhi_order where jhi_order.user.login = ?#{principal.username} and jhi_order.id = :id")
    Order findOneByUserIsCurrentUser(@Param("id") Long id);

}
